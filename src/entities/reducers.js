import { combineReducers } from 'redux'

function getIdentifier (payload, identAttr) {
  return payload && payload[identAttr]
    ? payload[identAttr]
    : payload
}

function filterItem (identAttr, ident) {
  return function (item) {
    return item[identAttr] === ident
  }
}

function getItemIndex (state, identAttr, ident) {
  return state.findIndex(filterItem(identAttr, ident))
}

function isActionInRoutines (routineCollection, action) {
  return routineCollection.some(routine => routine.SUCCESS === action.type)
}

function isActionRecognized (on, action) {
  return Object.keys(on).indexOf(action.type) !== -1
}

function deleteItem (state, action, identAttr) {
  const ident = getIdentifier(action.payload, identAttr)
  if (!ident) {
    return state
  }
  const itemIndex = getItemIndex(state, identAttr, ident)

  if (itemIndex === -1) {
    return state
  }

  const nextState = state.slice()
  nextState.splice(itemIndex, 1)
  return nextState
}

function upcreateItem (state, payload, identAttr, initialState) {
  if (payload instanceof Array) {
    return payload.reduce((acc, item) => upcreateItem(acc, item, identAttr), state)
  }
  const ident = getIdentifier(payload, identAttr)
  if (!ident) {
    return state
  }
  const itemIndex = getItemIndex(state, identAttr, ident)
  if (itemIndex === -1) {
    return [
      ...state,
      {
        ...initialState,
        ...payload,
        [identAttr]: ident
      }
    ]
  }
  const nextState = state.slice()
  const item = state[itemIndex]
  nextState[itemIndex] = {
    ...item,
    ...payload
  }
  return nextState
}

function modifyItem (state, action, identAttr, reducer) {
  if (action.payload instanceof Array) {
    return action.payload.reduce(
      (acc, item) => modifyItem(acc, { ...action, payload: item }, identAttr, reducer),
      state
    )
  }
  const ident = getIdentifier(action.payload, identAttr)
  if (!ident) {
    return state
  }
  const itemIndex = getItemIndex(state, identAttr, ident)
  const item = state[itemIndex]
  const result = {
    ...reducer(item, action),
    [identAttr]: ident
  }

  if (itemIndex === -1) {
    return [...state, result]
  }

  const nextState = state.slice()
  nextState[itemIndex] = result
  return nextState
}

export function createEntityReducer ({
  clearedBy = [],
  deletedBy = [],
  identAttr = 'uuid',
  initialState = {},
  on = {},
  providedBy = []
}) {
  return function entityReducer (state = [], action) {
    if (isActionInRoutines(clearedBy, action)) {
      return []
    }
    if (isActionInRoutines(providedBy, action)) {
      return upcreateItem(state, action.payload, identAttr, initialState)
    }
    if (isActionInRoutines(deletedBy, action)) {
      return deleteItem(state, action, identAttr)
    }
    if (isActionRecognized(on, action)) {
      return modifyItem(state, action, identAttr, on[action.type], initialState)
    }
    return state
  }
}

export function createEntitiesReducer (reducers) {
  return combineReducers(reducers)
}
