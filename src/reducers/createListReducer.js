import { handleActions } from 'redux-actions';

const handleItemAction = itemReducer => (state, action) => {
  const index = state.findIndex(item => item.uuid === action.meta.uuid);
  if (index !== -1) {
    const nextState = state.slice();
    nextState[index] = itemReducer(nextState[index], action);
    return nextState;
  }
  return state;
};

export default (routine, itemReducer, itemInitialState) => handleActions({
  [routine.ADD]: (state, action) => ([
    ...state,
    {
      ...itemInitialState,
      ...action.payload,
    },
  ]),
  [routine.REMOVE]: (state, action) => {
    const index = state.findIndex(item => item.uuid === action.meta.uuid);
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
