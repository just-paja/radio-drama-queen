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

export const createListReducer = (
  routine,
  itemReducer,
  itemInitialState,
) => handleActions({
  [routine.ADD]: (state, action) => {
    const index = state.findIndex(identifyItem(action, routine[LIST_IDENTIFIER]));
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
  [routine.REMOVE]: (state, action) => {
    const index = state.findIndex(identifyItem(action, routine[LIST_IDENTIFIER]));
    if (index !== -1) {
      const nextState = state.slice();
      nextState.splice(index, 1);
      return nextState;
    }
    return state;
  },
  [routine.CLEAR]: () => [],
  ...routine[LIST_ACTIONS].reduce((aggr, itemAction) => ({
    ...aggr,
    [itemAction]: handleItemAction(itemReducer, routine[LIST_IDENTIFIER]),
  }), {}),
}, []);

export default { createListReducer };
