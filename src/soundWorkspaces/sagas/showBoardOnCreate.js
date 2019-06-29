import { put, takeEvery } from 'redux-saga/effects'

import { workspaceRoutines } from '../actions'
import { boardRoutines } from '../../soundBoards'

function * handleBoardCreate () {
  yield takeEvery(boardRoutines.create.SUCCESS, function * ({ payload: { uuid } }) {
    yield put(workspaceRoutines.selectBoard(uuid))
  })
}

export default [
  handleBoardCreate
]
