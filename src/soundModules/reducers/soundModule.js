import { handleActions } from 'redux-actions';

import { soundModule as actions } from '../actions';

export const initialState = {
  name: null,
  url: null,
  loading: false,
};

const soundModule = handleActions({
  [actions.DOWNLOAD_REQUEST]: (state, action) => {
    const moduleIndex = state.modules.findIndex(module => module.name === action.payload);
    if (moduleIndex !== -1) {
      const nextState = { ...state };
      nextState.modules[moduleIndex] = {
        ...state.modules[moduleIndex],
        loading: true,
      };
      return nextState;
    }
    return state;
  },
  [actions.DOWNLOAD_SUCCESS]: (state, action) => {
    const moduleIndex = state.modules.findIndex(module => module.name === action.payload);
    if (moduleIndex !== -1) {
      const nextState = { ...state };
      nextState.modules[moduleIndex] = {
        ...state.modules[moduleIndex],
        ...action.meta,
        loading: false,
      };
      return nextState;
    }
    return state;
  },
  [actions.DOWNLOAD_FAILURE]: (state, action) => {
    const moduleIndex = state.modules.findIndex(module => module.name === action.payload);
    if (moduleIndex !== -1) {
      const nextState = { ...state };
      nextState.modules[moduleIndex] = {
        ...state.modules[moduleIndex],
        loading: false,
      };
      return nextState;
    }
    return state;
  },
}, initialState);

export default soundModule;
