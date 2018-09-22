import camelCase from 'camelcase';
import {
  composeActionType,
  createAction,
  createRoutineActions,
} from '../actions/routines';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const LIST_ACTIONS = 'listActions';
export const LIST_IDENTIFIER = 'listIdentifier';

export const createListAction = identifierName => actionName => (identifier, payload) => ({
  type: actionName,
  meta: { [identifierName]: identifier },
  payload,
});

export const createListRoutine = (baseName, actions = [], identifierName = 'uuid') => {
  const ACTION_ADD = composeActionType(baseName, ADD);
  const ACTION_REMOVE = composeActionType(baseName, REMOVE);
  const routineActions = createRoutineActions(
    baseName,
    actions,
    createListAction(identifierName)
  );
  return {
    ...routineActions,
    [LIST_ACTIONS]: actions.map(extraAction => composeActionType(baseName, extraAction)),
    [LIST_IDENTIFIER]: identifierName,
    [ADD]: ACTION_ADD,
    [camelCase(ADD)]: createAction(ACTION_ADD),
    [REMOVE]: ACTION_REMOVE,
    [camelCase(REMOVE)]: createAction(ACTION_REMOVE),
  };
};
