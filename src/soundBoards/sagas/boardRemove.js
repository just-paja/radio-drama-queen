import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryList } from '../../soundCategories/actions'
import { getBoardCategoryUuids } from '../selectors'
import { soundBoard } from '../actions'

function * handleBoardRemove () {
  yield takeEvery(soundBoard.REMOVE, function * ({ payload }) {
    const categories = yield select(getBoardCategoryUuids, payload)
    yield all(categories.map(categoryUuid => put(categoryList.removeStop(categoryUuid))))
  })
}

export default [handleBoardRemove]
