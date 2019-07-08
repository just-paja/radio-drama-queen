import { mergeArrays, reduceArray, upsert } from './reducers'
import { createEntityStore } from './store'
import { Relationship } from './Relationship'

class ManyToMany extends Relationship {
  get name () {
    return `manyToMany(${this.connection})`
  }

  createReferencer (parent, target, inverse = false) {
    return reduceArray(function referenceManyToManyPayload (state, action, reducerConfig) {
      const { identAttr } = reducerConfig
      let items
      if (inverse) {
        const ident = action.payload[target.identAttr]
        if (action.payload[parent.name]) {
          items = action.payload[parent.name].map(item => ({
            [identAttr]: `${item[parent.identAttr]}-${ident}`,
            [target.name]: ident,
            [parent.name]: item[target.identAttr]
          }))
        }
      } else {
        const ident = action.payload[parent.identAttr]
        if (action.payload[target.name]) {
          items = action.payload[target.name].map(item => ({
            [identAttr]: `${ident}-${item[target.identAttr]}`,
            [parent.name]: ident,
            [target.name]: item[target.identAttr]
          }))
        }
      }
      return items
        ? upsert(state, { payload: items }, reducerConfig)
        : state
    })
  }

  createReferenceReducers () {
    const parentReducers = (this.parent.config.providedBy || []).reduce((acc, routine) => ({
      ...acc,
      [routine.SUCCESS]: this.createReferencer(this.parent, this.target)
    }), {})
    const targetReducers = (this.target.config.providedBy || []).reduce((acc, routine) => ({
      ...acc,
      [routine.SUCCESS]: this.createReferencer(this.parent, this.target, true)
    }), parentReducers)
    return targetReducers
  }

  createUpsertReducers (routines, srcName) {
    return routines.reduce((acc, routine) => ({
      ...acc,
      [routine.SUCCESS]: reduceArray((state, action, config) => {
        if (!action.payload[srcName]) {
          return state
        }
        const payload = action.payload[srcName]
        return upsert(state, { payload }, config)
      })
    }), {})
  }

  createStore () {
    this.store = createEntityStore(this.name, {
      collectionReducers: this.createReferenceReducers(),
      identAttr: 'composed'
    })
    this.store.relation = this
    return this.store
  }

  configureStores () {
    this.parent.configure({
      ignoreAttrs: mergeArrays(
        this.parent.ignoreAttrs,
        [this.target.name]
      ),
      collectionReducers: {
        ...this.parent.collectionReducers,
        ...this.createUpsertReducers(this.target.config.providedBy, this.parent.name)
      }
    })
    this.target.configure({
      ignoreAttrs: mergeArrays(
        this.target.ignoreAttrs,
        [this.parent.name]
      ),
      collectionReducers: {
        ...this.parent.collectionReducers,
        ...this.createUpsertReducers(this.parent.config.providedBy, this.target.name)
      }
    })
  }
}

function getStoreByName (stores, name) {
  const result = stores.find(store => store.name === name)
  if (!result) {
    throw new Error(`Cannot find entity store called ${name}`)
  }
  return result
}

export function createManyToMany (stores) {
  return stores
    .filter(store => store.config.hasManyToMany)
    .reduce((acc, store) => [
      ...acc,
      ...store.config.hasManyToMany.map(relatedCollectionName => new ManyToMany({
        parent: store,
        target: getStoreByName(stores, relatedCollectionName)
      }))
    ], [])
}
