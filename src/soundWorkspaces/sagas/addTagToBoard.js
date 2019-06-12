import { call, put, takeEvery } from 'redux-saga/effects'

import { workspaceTag } from '../actions'
import { soundBoard } from '../../soundBoards/actions'
import { categoryList } from '../../soundCategories/actions'
import { createDefaultBoard } from './createDefaultBoard'

function * addToBoard ({ payload, meta }) {
  if (meta && meta.target && meta.target.category) {
    yield put(categoryList.tagAdd(meta.target.category, payload))
  } else if (meta && meta.target && meta.target.board) {
    yield put(soundBoard.tagAdd(meta.target.board, payload))
  } else {
    const board = yield call(createDefaultBoard)
    yield put(soundBoard.tagAdd(board.uuid, payload))
  }
}

function * handleTagAdd () {
  yield takeEvery(workspaceTag.ADD_TO_BOARD, addToBoard)
}

export default [
  handleTagAdd
]
