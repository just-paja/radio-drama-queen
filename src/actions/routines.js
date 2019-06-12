import camelCase from 'camelcase'

export const composeActionType = (baseName, actionType) => `${baseName}/${actionType}`

export const createAction = actionName => (payload, meta) => ({
  type: actionName,
  meta,
  payload
})

export const createRoutineActions = (baseName, extraActions, actionCreator) => ({
  ...extraActions.reduce((aggr, action) => {
    const actionName = composeActionType(baseName, action)
    return {
      ...aggr,
      [action]: actionName,
      [camelCase(action)]: actionCreator(actionName)
    }
  }, {})
})

export const createRoutine = (baseName, extraActions) => createRoutineActions(
  baseName,
  extraActions,
  createAction
)
