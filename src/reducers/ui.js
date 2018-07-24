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
}, initialState);

export default ui;
