import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceSound } from '../actions';
import { soundBoard } from '../../soundBoards/actions';
import { categoryList } from '../../soundCategories/actions';
import { createDefaultBoard } from './createDefaultBoard';

function* addToGrid({ payload, meta }) {
  if (meta && meta.target && meta.target.category) {
    yield put(categoryList.soundAdd(meta.target.category, payload));
  } else if (meta && meta.target && meta.target.board) {
    yield put(soundBoard.soundAdd(meta.target.board, payload));
  } else {
    const board = yield call(createDefaultBoard);
    yield put(soundBoard.soundAdd(board.uuid, payload));
  }
}

function* handleSoundAdd() {
  yield takeEvery(workspaceSound.ADD_TO_BOARD, addToGrid);
}

export default [
  handleSoundAdd,
];
