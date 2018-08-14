import { handleActions } from 'redux-actions';

import { notify } from '../actions';

const initialState = [];

const reducers = {
  [notify.ADD]: (state, action) => state.concat([
    {
      uuid: action.meta.uuid,
      visible: true,
      data: action.payload,
    },
  ]),
  [notify.HIDE]: (state, action) => {
    const notificationIndex = state.findIndex(item => item.uuid === action.meta.uuid);
    if (notificationIndex !== -1) {
      const nextState = state.slice();
      const notification = state[notificationIndex];
      nextState[notificationIndex] = {
        ...notification,
        visible: false,
      };
      return nextState;
    }
    return state;
  },
  [notify.REMOVE]: (state, action) => {
    const notificationIndex = state.findIndex(item => item.uuid === action.meta.uuid);
    if (notificationIndex !== -1) {
      const nextState = state.slice();
      nextState.splice(notificationIndex, 1);
      return nextState;
    }

    return state;
  },
};

export default handleActions(reducers, initialState);
