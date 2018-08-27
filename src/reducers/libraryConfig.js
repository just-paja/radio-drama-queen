import { handleActions } from 'redux-actions';

import { library } from '../actions';

const dirname = path => path.match(/.*\//);

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
    modules: modules.map((module) => {
      if (typeof module === 'string') {
        return {
          name: module,
          url: `${dirname(url)}${module}/manifest.json`,
        };
      }
      return module;
    }),
    name,
    url,
  }),
}, initialState);

export default libraryConfig;
