import { categoryRoutines, categoryStore } from '../../soundCategories'
import { getBoardCategories } from '../../soundBoards/selectors'
import { getFocusedCategory } from '../selectors'
import { put, select, takeEvery } from 'redux-saga/effects'
import { workspaceRoutines } from '../actions'

function * refocusOnSelect () {
  yield takeEvery(workspaceRoutines.selectBoard.TRIGGER, function * (action) {
    const categoryUuid = yield select(getFocusedCategory)
    const category = yield select(categoryStore.getObject, categoryUuid)
    if (!category || category.board !== action.payload) {
      const boardCategories = yield select(getBoardCategories, action.payload)
      if (boardCategories[0]) {
        yield put(categoryRoutines.focus(boardCategories[0].uuid))
      }
    }
  })
}

export default [
  refocusOnSelect
]
