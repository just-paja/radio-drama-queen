import { handleActions } from 'redux-actions';
import { turnOn, turnOff } from 'react-saga-rest';

import { library } from '../actions';

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
}, initialState);

export default ui;
