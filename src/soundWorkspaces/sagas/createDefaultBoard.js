import { call, select } from 'redux-saga/effects'

import { createBoard } from '../../soundBoards/sagas'
import { getDefaultTargetBoard } from '../selectors'

export function * createDefaultBoard () {
  const defaultTargetBoard = yield select(getDefaultTargetBoard)
  if (!defaultTargetBoard) {
    yield call(createBoard)
  }
  return yield select(getDefaultTargetBoard)
}

export default []
