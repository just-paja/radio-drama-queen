import { combineReducers } from 'redux'
import { createManyToMany } from './manyToMany'

export function createEntitiesReducer (...stores) {
  const manyToMany = createManyToMany(stores)
  const allStores = [
    ...stores,
    ...manyToMany.map(relation => relation.createStore())
  ]
  manyToMany.forEach(relation => relation.configureStores())
  allStores.forEach(store => store.initialize())
  return combineReducers(allStores.reduce((acc, store) => ({
    ...acc,
    [store.name]: store.reducer
  }), {}))
}
