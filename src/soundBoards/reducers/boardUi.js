import { handleActions } from 'redux-actions';
import { turnOff, turnOn } from 'react-saga-rest';

import {
  categoryCreate,
  boardRename,
} from '../actions';

const initialState = {
  showCreateForm: false,
  showBoardRenameDialog: false,
};

const boardUi = handleActions({
  [boardRename.CLOSE]: turnOff('showBoardRenameDialog'),
  [boardRename.OPEN]: turnOn('showBoardRenameDialog'),
  [categoryCreate.FORM_HIDE]: turnOff('showCreateForm'),
  [categoryCreate.FORM_SHOW]: turnOn('showCreateForm'),
}, initialState);

export default boardUi;
