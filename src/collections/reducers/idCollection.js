export const addPayload = (collectionName, path) => (state, action) => {
  const value = path ? action.payload[path] : action.payload
  if (state[collectionName].indexOf(value) !== -1) {
    return state
  }
  return ({
    ...state,
    [collectionName]: [
      ...state[collectionName],
      value
    ]
  })
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
