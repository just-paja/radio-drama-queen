import { handleActions } from 'redux-actions';

import { library } from '../actions';

const initialState = {
  name: null,
  modules: [],
  fsPath: null,
};

const libraryConfig = handleActions({
  [library.SAVE_AS_SUBMIT]: (state, { payload: { fsPath } }) => ({
    ...state,
    fsPath,
  }),
  [library.SET_CONFIG]: (state, { payload: { modules, name, url } }) => ({
    ...state,
    modules,
    name,
    url,
  }),
  [library.MODULE_DOWNLOAD_REQUEST]: (state, action) => {
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
  [library.MODULE_DOWNLOAD_SUCCESS]: (state, action) => {
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
  [library.MODULE_DOWNLOAD_FAILURE]: (state, action) => {
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

export default libraryConfig;
