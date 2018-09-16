import { handleActions } from 'redux-actions';

import { library } from '../actions';

const initialState = {
  name: null,
  modules: [],
  fsPath: null,
};

export default handleActions({
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
}, initialState);
