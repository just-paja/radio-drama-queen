import { put, takeEvery } from 'redux-saga/effects'

import { workspace } from '../actions'
import { soundBoard } from '../../soundBoards/actions'

function * showBoard ({ payload: { uuid } }) {
  yield put(workspace.selectBoard(uuid))
}

function * handleBoardCreate () {
  yield takeEvery(soundBoard.ADD, showBoard)
}

export default [
  handleBoardCreate
]
