import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceTag } from '../actions';
import { soundBoard } from '../../soundBoards/actions';
import { createDefaultBoard } from './createDefaultBoard';

function* addToBoard({ payload }) {
  const board = yield call(createDefaultBoard);
  yield put(soundBoard.tagAdd(board.uuid, payload));
}

function* handleTagAdd() {
  yield takeEvery(workspaceTag.ADD_TO_BOARD, addToBoard);
}

export default [
  handleTagAdd,
];
