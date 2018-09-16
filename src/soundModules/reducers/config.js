import { handleActions } from 'redux-actions';

import { library } from '../actions';

const initialState = {
  name: null,
  modules: [],
  fsPath: null,
};

export default handleActions({
  [library.SET_CONFIG]: (state, { payload: { modules, name, url } }) => ({
    ...state,
    modules,
    name,
    url,
  }),
}, initialState);
