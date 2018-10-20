import { handleActions } from 'redux-actions';
import { LIST_ACTIONS, LIST_IDENTIFIER } from './routines';

const identifyItem = (action, identifier) => item => (
  (action.meta && item[identifier] === action.meta[identifier])
  || item[identifier] === action.payload
  || (
    action.payload instanceof Object
    && action.payload[identifier] === item[identifier]
  )
);

const handleItemAction = (itemReducer, identifier) => (state, action) => {
  const index = state.findIndex(identifyItem(action, identifier));
  if (index !== -1) {
    const nextState = state.slice();
    nextState[index] = itemReducer(nextState[index], action);
    return nextState;
  }
  return state;
};

const flattenRoutineActions = (itemReducer, routines) => {
  if (routines instanceof Array) {
    return routines.reduce((flatAggr, routine) => ({
      ...flatAggr,
      ...routine[LIST_ACTIONS].reduce((aggr, itemAction) => ({
        ...aggr,
        [itemAction]: handleItemAction(itemReducer, routine[LIST_IDENTIFIER]),
      }), {})
    }), {});
  }
  return flattenRoutineActions(itemReducer, [routines]);
};

export const createListReducer = (
  routines,
  itemReducer,
  itemInitialState,
) => {
  const mainRoutine = routines instanceof Array ? routines[0] : routines;

  return handleActions({
    [mainRoutine.ADD]: (state, action) => {
      const index = state.findIndex(identifyItem(action, mainRoutine[LIST_IDENTIFIER]));
      if (index === -1) {
        return [
          ...state,
          {
            ...itemInitialState,
            ...action.payload,
          },
        ];
      }
      return state;
    },
    [mainRoutine.REMOVE]: (state, action) => {
      const index = state.findIndex(identifyItem(action, mainRoutine[LIST_IDENTIFIER]));
      if (index !== -1) {
        const nextState = state.slice();
        nextState.splice(index, 1);
        return nextState;
      }
      return state;
    },
    [mainRoutine.CLEAR]: () => [],
    ...flattenRoutineActions(itemReducer, routines),
  }, []);
};

export default { createListReducer };
