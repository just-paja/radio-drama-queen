import { categoryRoutines } from '../actions'
import { categoryStore } from '../store'
import { put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../../sounds'

function * handleCategoryLoopToggle () {
  yield takeEvery(categoryRoutines.toggleLoop.TRIGGER, function * ({ payload: categoryUuid }) {
    const category = yield select(categoryStore.getFirst, categoryUuid)
    if (category) {
      yield put(category.loop
        ? soundRoutines.loopOff(category.sounds)
        : soundRoutines.loopOn(category.sounds))
      yield put(categoryRoutines.toggleLoop.success(categoryUuid))
    }
    yield put(categoryRoutines.toggleLoop.fulfill(categoryUuid))
  })
}

export default [
  handleCategoryLoopToggle
]
