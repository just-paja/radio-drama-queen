import { boardRoutines } from '../../soundBoards'
import { call, put, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../../soundCategories'
import { createDefaultBoard } from './createDefaultBoard'
import { tagRoutines } from '../../soundTags'

function * addToBoard ({ payload, meta }) {
  if (meta && meta.target && meta.target.category) {
    yield put(categoryRoutines.tagAdd(meta.target.category, payload))
  } else if (meta && meta.target && meta.target.board) {
    yield put(boardRoutines.tagAdd(meta.target.board, payload))
  } else {
    const board = yield call(createDefaultBoard)
    yield put(boardRoutines.tagAdd(board.uuid, payload))
  }
}

function * handleTagAdd () {
  yield takeEvery(tagRoutines.addToBoard.TRIGGER, addToBoard)
}

export default [
  handleTagAdd
]
