import { put, take, select } from 'redux-saga/effects'

import { boardRoutines } from '../../soundBoards'
import { getDefaultTargetBoard } from '../selectors'

export function * createDefaultBoard () {
  const board = yield select(getDefaultTargetBoard)
  if (board) {
    return board
  }
  yield put(boardRoutines.create())
  yield take(boardRoutines.create.SUCCESS)
  return yield select(getDefaultTargetBoard)
}

export default []
