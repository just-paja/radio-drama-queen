import { createEntityReducer } from './reducers'
import { createEntityRoutines } from './actions'
import {
  createCollectionSelector,
  createIsEmptySelector,
  createObjectFlagSelector,
  createObjectPropSelector,
  createObjectSelector,
  createSizeSelector
} from './selectors'

export function createEntityStore (collectionName, {
  clearedBy = [],
  identAttr = 'uuid',
  ...options
}) {
  const clear = createEntityRoutines(collectionName, ['CLEAR'])
  return {
    clear,
    getAll: createCollectionSelector(collectionName),
    getFirst: createObjectSelector(collectionName, identAttr),
    getFlag: createObjectFlagSelector(collectionName, identAttr),
    getProp: createObjectPropSelector(collectionName, identAttr),
    getSize: createSizeSelector(collectionName),
    isEmpty: createIsEmptySelector(collectionName),
    reducer: createEntityReducer({
      ...options,
      clearedBy: [clear, ...clearedBy],
      identAttr
    })
  }
}
