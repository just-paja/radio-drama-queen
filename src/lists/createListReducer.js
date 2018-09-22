import { handleActions } from 'redux-actions';

const identifyItem = action => item => (
  (action.meta && item.uuid === action.meta.uuid)
  || item.uuid === action.payload
);

const handleItemAction = itemReducer => (state, action) => {
  const index = state.findIndex(identifyItem(action));
  if (index !== -1) {
    const nextState = state.slice();
    nextState[index] = itemReducer(nextState[index], action);
    return nextState;
  }
  return state;
};

export const createListReducer = (routine, itemReducer, itemInitialState) => handleActions({
  [routine.ADD]: (state, action) => ([
    ...state,
    {
      ...itemInitialState,
      ...action.payload,
    },
  ]),
  [routine.REMOVE]: (state, action) => {
    const index = state.findIndex(identifyItem(action));
    if (index !== -1) {
      const nextState = state.slice();
      nextState.splice(index, 1);
      return nextState;
    }
    return state;
  },
  ...itemReducer.actions.reduce((aggr, itemAction) => ({
    ...aggr,
    [itemAction]: handleItemAction(itemReducer),
  }), {}),
}, []);

export default { createListReducer };
