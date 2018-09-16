import { handleActions } from 'redux-actions';
import { turnOn, turnOff } from 'react-saga-rest';

import { library } from '../actions';

const initialState = {
  showOpenLibraryDialog: false,
};

const ui = handleActions({
  [library.OPEN_DIALOG_HIDE]: turnOff('showOpenLibraryDialog'),
  [library.OPEN_DIALOG_SHOW]: turnOn('showOpenLibraryDialog'),
}, initialState);

export default ui;
