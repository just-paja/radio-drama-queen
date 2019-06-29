import generateUuid from 'uuid/v4'

import { categoryRoutines } from '../actions'
import { put, takeEvery } from 'redux-saga/effects'

function * handleCategoryCreate () {
  yield takeEvery(categoryRoutines.create.TRIGGER, function * createCategory ({ payload }) {
    const category = {
      ...payload,
      uuid: generateUuid(),
      sounds: payload.sounds || []
    }
    yield put(categoryRoutines.create.success(category))
    return category
  })
}

export default [
  handleCategoryCreate
]
