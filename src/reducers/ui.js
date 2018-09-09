import { handleActions } from 'redux-actions';
import { toggle, turnOn, turnOff } from 'react-saga-rest';

import { library, ui as uiActions } from '../actions';

const initialState = {
  showOpenLibraryDialog: false,
  showSaveAsDialog: false,
};

const ui = handleActions({
  [library.OPEN_DIALOG_HIDE]: turnOff('showOpenLibraryDialog'),
  [library.OPEN_DIALOG_SHOW]: turnOn('showOpenLibraryDialog'),
  [library.SAVE_AS_CANCEL]: turnOff('showSaveAsDialog'),
  [library.SAVE_AS_HIDE]: turnOff('showSaveAsDialog'),
  [library.SAVE_AS]: turnOn('showSaveAsDialog'),
  [uiActions.EDIT_MODE_TOGGLE]: toggle('editMode'),
}, initialState);

export default ui;
