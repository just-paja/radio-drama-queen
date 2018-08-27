import { handleActions } from 'redux-actions';

import { library } from '../actions';

const initialState = {
  showSaveAsDialog: false,
};

const ui = handleActions({
  [library.SAVE_AS]: state => ({
    ...state,
    showSaveAsDialog: true,
  }),
  [library.SAVE_AS_CANCEL]: state => ({
    ...state,
    showSaveAsDialog: false,
  }),
  [library.SAVE_AS_HIDE]: state => ({
    ...state,
    showSaveAsDialog: false,
  }),
  [library.OPEN_DIALOG_SHOW]: state => ({
    ...state,
    showOpenLibraryDialog: true,
  }),
  [library.OPEN_DIALOG_HIDE]: state => ({
    ...state,
    showOpenLibraryDialog: false,
  }),
}, initialState);

export default ui;
