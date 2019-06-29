import { categoryRoutines } from '../actions'
import { put, takeEvery } from '@redux-saga/core/effects'
import { soundRoutines } from '../../sounds'

function * handleSoundAdd () {
  yield takeEvery(categoryRoutines.soundAdd.TRIGGER, function * ({ payload: { sound } }) {
    yield put(soundRoutines.load(sound))
  })
}

export default [handleSoundAdd]
