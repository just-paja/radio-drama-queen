export function addPayload (collectionName, path) {
  return function (state, action) {
    const value = path ? action.payload[path] : action.payload
    const source = state[collectionName] || []
    return source.indexOf(value) === -1
      ? Object.assign({}, state, { [collectionName]: source.concat(value) })
      : state
  }
}

export const removePayload = (collectionName, path) => (state, action) => {
  const value = path ? action.payload[path] : action.payload
  const index = state[collectionName].indexOf(value)
  if (value && index !== -1) {
    const items = state[collectionName].slice()
    items.splice(index, 1)
    return {
      ...state,
      [collectionName]: items
    }
  }
  return state
}
