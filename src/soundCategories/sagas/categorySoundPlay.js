import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../actions'
import { getSoundCategories } from '../selectors'
import { soundRoutines } from '../../sounds'

export function * handleCategorySoundPlay () {
  yield takeEvery(soundRoutines.play.TRIGGER, function * ({ payload }) {
    const soundCategories = yield select(getSoundCategories, payload)
    yield all(soundCategories
      .filter(category => category.exclusive)
      .map(category => put(categoryRoutines.stop(category.uuid, payload))))
  })
}

export default [
  handleCategorySoundPlay
]
