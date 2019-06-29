import { createSelector } from 'reselect'

export function getEntities (state) {
  return state.entities
}

export function getCollection (state, collectionName) {
  const spot = getEntities(state)
  return spot[collectionName]
}

export function createCollectionSelector (collectionName) {
  return function (state) {
    return getCollection(state, collectionName)
  }
}

export function createIsEmptySelector (collectionName) {
  return function (state) {
    const collection = getCollection(state, collectionName)
    return collection ? collection.length === 0 : true
  }
}

export function createSizeSelector (collectionName) {
  return function (state) {
    const collection = getCollection(state, collectionName)
    return collection ? collection.length : 0
  }
}

export function getObject (collection, identName, ident) {
  return collection.find(item => item[identName] === ident) || null
}

export function createObjectSelector (collectionName, identName) {
  return createSelector(
    state => getCollection(state, collectionName),
    (collection, ident) => ident,
    (collection, ident) => getObject(collection, identName, ident)
  )
}

function getObjectProp (collection, identName, ident, prop) {
  const item = getObject(collection, identName, ident)
  return item ? item[prop] : null
}

export function createObjectPropSelector (collectionName, identName) {
  return createSelector(
    state => getCollection(state, collectionName),
    (collection, ident) => ident,
    (collection, ident, prop) => prop,
    (collection, ident, prop) => getObjectProp(collection, identName, ident, prop)
  )
}

export function createObjectFlagSelector (collectionName, identName) {
  return createSelector(
    state => getCollection(state, collectionName),
    (collection, ident) => ident,
    (collection, ident, prop) => prop,
    (collection, ident, prop) => getObjectProp(collection, identName, ident, prop) || false
  )
}
