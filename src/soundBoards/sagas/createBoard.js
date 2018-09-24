import generateUuid from 'uuid/v4';

import { put, select } from 'redux-saga/effects';

import { soundBoard } from '../actions';
import { getBoards } from '../selectors';

export function* createBoard() {
  const allBoards = yield select(getBoards);
  yield put(soundBoard.add({
    name: `Board ${allBoards.length + 1}`,
    uuid: generateUuid(),
  }));
}

export default [];
