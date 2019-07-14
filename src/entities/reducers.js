export function filterUnique (item, index, src) {
  return src.indexOf(item) === index
}

function flat (arrays) {
  return arrays.reduce((acc, arr) => acc.concat(arr), [])
}

export function mergeArrays (...args) {
  return flat(args).filter(item => item).filter(filterUnique)
}

function getIdentifier (payload, identAttr) {
  if (payload && payload[identAttr]) {
    return payload[identAttr]
  }
  if (typeof payload === 'string') {
    return payload
  }
  return null
}

function filterAttrs (ignoreAttrs, item) {
  if (ignoreAttrs && ignoreAttrs.length) {
    return Object
      .keys(item)
      .filter(attr => ignoreAttrs.indexOf(attr) === -1)
      .reduce((acc, attr) => ({
        ...acc,
        [attr]: item[attr]
      }), {})
  }
  return item
}

function filterItem (identAttr, ident) {
  return function (item) {
    return item[identAttr] === ident
  }
}

export function getItemIndex (state, identAttr, ident) {
  return state.findIndex(filterItem(identAttr, ident))
}

function isActionInRoutines (routines, action) {
  return routines && routines.some(routine => routine.SUCCESS === action.type)
}

function isActionRecognized (on, action) {
  return on && Object.keys(on).indexOf(action.type) !== -1
}

export function reduceArray (reducer) {
  return function (state, action, config) {
    if (action.payload instanceof Array) {
      return action.payload.reduce(
        function (acc, payload) {
          return reducer(acc, { payload }, config)
        },
        state
      )
    }
    return reducer(state, action, config)
  }
}

export function requireIdent (reducer) {
  return function (state, action, config) {
    const ident = getIdentifier(action.payload, config.identAttr)
    return ident
      ? reducer(state, action, config, ident)
      : state
  }
}

export const remove = reduceArray(requireIdent(function (state, action, config, ident) {
  const itemIndex = getItemIndex(state, config.identAttr, ident)
  if (itemIndex === -1) {
    return state
  }
  const nextState = state.slice()
  nextState.splice(itemIndex, 1)
  return nextState
}))

function processEntity (config, entity) {
  if (config.entityProcessors && config.entityProcessors.length) {
    return config.entityProcessors.reduce((acc, processor) => processor(acc), entity)
  }
  return entity
}

export const upsert = reduceArray(requireIdent(function (state, action, config, ident) {
  const itemIndex = getItemIndex(state, config.identAttr, ident)
  if (itemIndex === -1) {
    return [
      ...state,
      processEntity(config, {
        ...config.initialState,
        ...action.payload,
        [config.identAttr]: ident
      })
    ]
  }
  const nextState = state.slice()
  nextState[itemIndex] = processEntity(config, action.payload)
  return nextState
}))

export const modify = reduceArray(requireIdent(function (state, action, config, ident) {
  const { identAttr, reducer, ignoreAttrs } = config
  if (!reducer) {
    throw new Error('You must pass reducer function to the modify reducer')
  }
  const itemIndex = getItemIndex(state, identAttr, ident)
  const item = state[itemIndex]
  const result = filterAttrs(ignoreAttrs, {
    ...reducer(item, action),
    [identAttr]: ident
  })

  if (itemIndex === -1) {
    return [...state, result]
  }

  const nextState = state.slice()
  nextState[itemIndex] = result
  return nextState
}))

function configure (reducerOptions) {
  return {
    identAttr: 'uuid',
    ...reducerOptions
  }
}

export function createEntityReducer (config) {
  const {
    clearedBy,
    deletedBy,
    on,
    collectionReducers,
    providedBy,
    ...reducerOptions
  } = config
  const reducerConfig = configure(reducerOptions)
  return function entityReducer (state = [], action) {
    if (isActionRecognized(collectionReducers, action)) {
      return collectionReducers[action.type](state, action, reducerConfig)
    }
    if (isActionInRoutines(providedBy, action)) {
      return upsert(state, action, reducerConfig)
    }
    if (isActionRecognized(on, action)) {
      return modify(state, action, { ...reducerConfig, reducer: on[action.type] })
    }
    if (isActionInRoutines(deletedBy, action)) {
      return remove(state, action, reducerConfig)
    }
    if (isActionInRoutines(clearedBy, action)) {
      return []
    }
    return state
  }
}
