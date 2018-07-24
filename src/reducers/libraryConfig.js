import { handleActions } from 'redux-actions';

import { library } from '../actions';

const initialState = {
  fsPath: null,
};

const libraryConfig = handleActions({
  [library.SAVE_AS_SUBMIT]: (state, { payload: { fsPath } }) => ({
    ...state,
    fsPath,
  }),
}, initialState);

export default libraryConfig;
