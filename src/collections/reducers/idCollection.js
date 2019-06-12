export const addPayload = collectionName => (state, action) => {
  if (state[collectionName].indexOf(action.payload) !== -1) {
    return state
  }
  return ({
    ...state,
    [collectionName]: [
      ...state[collectionName],
      action.payload
    ]
  })
}

export const removePayload = collectionName => (state, action) => {
  const index = state[collectionName].indexOf(action.payload)
  if (action.payload && index !== -1) {
    const items = state[collectionName].slice()
    items.splice(index, 1)
    return {
      ...state,
      [collectionName]: items
    }
  }
  return state
}
