import { call, put, takeEvery } from 'redux-saga/effects'
import { categoryCreate } from '../actions'
import { createCategory } from '../../soundCategories/sagas'

function * handleCategoryCreate () {
  yield takeEvery(categoryCreate.SUBMIT, function * ({ payload, meta: { board } }) {
    yield call(createCategory, { payload: { ...payload, board } })
    yield put(categoryCreate.formHide())
  })
}

export default [handleCategoryCreate]
