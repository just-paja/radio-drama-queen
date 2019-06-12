import { put, takeLatest } from 'redux-saga/effects'

import { categoryList } from '../actions'

function * removeCategory ({ meta: { uuid } }) {
  yield put(categoryList.stop(uuid))
  yield put(categoryList.remove(uuid))
}

function * handleCategoryRemove () {
  yield takeLatest(categoryList.REMOVE_STOP, removeCategory)
}

export default [
  handleCategoryRemove
]
