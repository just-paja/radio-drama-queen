import { getItemIndex, mergeArrays, reduceArray, upsert } from './reducers'
import { Relationship } from './Relationship'

class ManyToMany extends Relationship {
  get name () {
    return `manyToMany(${this.connection})`
  }

  createUpsertReducers (routines, src, dest) {
    return routines.reduce((acc, routine) => ({
      ...acc,
      [routine.SUCCESS]: reduceArray(function (state, action, config) {
        const carrier = action.payload
        const items = carrier[dest.name]
        if (!items) {
          return state
        }
        const ident = carrier[src.identAttr]
        const payload = items.map((item) => {
          const itemIndex = getItemIndex(state, config.identAttr, item[config.identAttr])
          if (itemIndex === -1) {
            // console.log('create', item)
            return {
              ...item,
              [src.name]: [ident]
            }
          } else {
            // console.log('update', item)
            return {
              ...state[itemIndex],
              ...item,
              [src.name]: state[itemIndex][src.name].concat([ident])
            }
          }
        })
        return upsert(state, { payload }, config)
      })
    }), {})
  }

  createEntityProcessor (relatedStore) {
    return function (item) {
      const targets = item[relatedStore.name]
      return {
        ...item,
        [relatedStore.name]: targets
          ? targets.map((item) =>
            item instanceof Object
              ? item[relatedStore.identAttr]
              : item)
          : []
      }
    }
  }

  configureStores () {
    if (this.target.config.providedBy) {
      this.parent.configure({
        collectionReducers: {
          ...this.parent.collectionReducers,
          ...this.createUpsertReducers(this.target.config.providedBy, this.target, this.parent)
        }
      })
    }
    this.parent.configure({
      entityProcessors: mergeArrays(
        this.parent.entityProcessors,
        [this.createEntityProcessor(this.target)]
      )
    })
    if (this.parent.config.providedBy) {
      this.target.configure({
        collectionReducers: {
          ...this.parent.collectionReducers,
          ...this.createUpsertReducers(this.parent.config.providedBy, this.parent, this.target)
        }
      })
    }
    this.target.configure({
      entityProcessors: mergeArrays(
        this.target.entityProcessors,
        [this.createEntityProcessor(this.parent)]
      )
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
