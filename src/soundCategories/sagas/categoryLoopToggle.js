import { categoryRoutines } from '../actions'
import { categoryStore } from '../store'
import { put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../../sounds'

function * handleCategoryLoopToggle () {
  yield takeEvery(categoryRoutines.toggleLoop.SUCCESS, function * ({ payload: { uuid } }) {
    const category = yield select(categoryStore.getObject, uuid)
    if (category) {
      yield put(category.loop
        ? soundRoutines.loopOff(category.sounds)
        : soundRoutines.loopOn(category.sounds))
    }
  })
}

export default [
  handleCategoryLoopToggle
]
