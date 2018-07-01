const ADD = 'ADD';
const REMOVE = 'REMOVE';

const toCamelCase = name => name.toLowerCase().replace(/_(\w)/g, (matches, letter) => letter.toUpperCase());

const defaultActionCreator = actionName => (payload, meta) => ({
  type: actionName,
  meta,
  payload,
});

const listActionCreator = actionName => (uuid, payload) => ({
  type: actionName,
  meta: { uuid },
  payload,
});

export const createRoutineActions = (baseName, extraActions, actionCreator) => {
  const actions = [REMOVE, ...extraActions];
  return {
    ...actions.reduce((aggr, action) => {
      const actionName = `${baseName}/${action}`;
      return {
        ...aggr,
        [action]: actionName,
        [toCamelCase(action)]: actionCreator(actionName),
      };
    }, {}),
  };
};

export const createRoutine = (baseName, extraActions) => createRoutineActions(
  baseName,
  extraActions,
  defaultActionCreator
);

export const createListRoutine = (baseName, extraActions) => {
  const ACTION_ADD = `${baseName}/${ADD}`;
  const routineActions = createRoutineActions(baseName, extraActions, listActionCreator);
  return {
    ...routineActions,
    [ADD]: ACTION_ADD,
    add: defaultActionCreator(ACTION_ADD),
  };
};
