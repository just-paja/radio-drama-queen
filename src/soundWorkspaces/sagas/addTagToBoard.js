import { boardRoutines } from '../../soundBoards'
import { call, put, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../../soundCategories'
import { createDefaultBoard } from './createDefaultBoard'
import { workspaceRoutines } from '../actions'

function * addToBoard ({ payload: { board, category, tag } }) {
  if (category) {
    yield put(categoryRoutines.tagAdd({ uuid: category, tag }))
  } else if (board) {
    yield put(boardRoutines.tagAdd({ uuid: board, tag }))
  } else {
    const targetBoard = yield call(createDefaultBoard)
    yield put(boardRoutines.tagAdd({ uuid: targetBoard.uuid, tag }))
  }
}

function * handleTagAdd () {
  yield takeEvery(workspaceRoutines.addTag.TRIGGER, addToBoard)
}

export default [
  handleTagAdd
]
