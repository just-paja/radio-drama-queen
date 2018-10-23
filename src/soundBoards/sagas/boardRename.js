import { put, takeEvery } from 'redux-saga/effects';

import { soundBoard, boardRename } from '../actions';

export function* renameBoard({ payload, meta: { uuid } }) {
  yield put(boardRename.close(uuid));
  yield put(soundBoard.rename(uuid, payload));
}

function* handleBoardRenameSubmit() {
  yield takeEvery(boardRename.SUBMIT, renameBoard);
}

export default [
  handleBoardRenameSubmit,
];
