import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceSound } from '../actions';
import { soundBoard } from '../../soundBoards/actions';
import { createDefaultBoard } from './createDefaultBoard';

function* addToGrid({ payload }) {
  const board = yield call(createDefaultBoard);
  yield put(soundBoard.soundAdd(board.uuid, payload));
}

function* handleSoundAdd() {
  yield takeEvery(workspaceSound.ADD_TO_BOARD, addToGrid);
}

export default [
  handleSoundAdd,
];
