import { filterUnique, getItemIndex, reduceArray, upsert } from './reducers'
import { Relationship } from './Relationship'

class ManyToMany extends Relationship {
  get name () {
    return `manyToMany(${this.connection})`
  }

  createUpsertReducers (src) {
    return src.config.providedBy.reduce((acc, routine) => ({
      ...acc,
      [routine.SUCCESS]: reduceArray(function (state, action, config) {
        const carrier = action.payload
        const items = carrier[config.name]
        if (!items || items.length === 0) {
          return state
        }
        const ident = carrier[src.identAttr]
        const payload = items.map((item) => {
          const itemIndex = getItemIndex(state, config.identAttr, item[config.identAttr])
          const relatedItems = itemIndex === -1
            ? [ident]
            : state[itemIndex][src.name].concat([ident])
          return { ...item, [src.name]: relatedItems }
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
          ? targets
            .map((item) => item instanceof Object ? item[relatedStore.identAttr] : item)
            .filter(filterUnique)
          : []
      }
    }
  }

  configureStores () {
    if (this.target.config.providedBy) {
      this.parent.extend('collectionReducers', this.createUpsertReducers(this.target))
    }
    if (this.parent.config.providedBy) {
      this.target.extend('collectionReducers', this.createUpsertReducers(this.parent))
    }
    this.parent.append('entityProcessors', this.createEntityProcessor(this.target))
    this.target.append('entityProcessors', this.createEntityProcessor(this.parent))
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
