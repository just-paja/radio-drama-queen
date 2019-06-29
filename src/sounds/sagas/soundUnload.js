import { call, put, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../actions'

import AudioManager from '../AudioManager'

export function * handleSoundUnload () {
  yield takeEvery(soundRoutines.unload.TRIGGER, function * ({ payload }) {
    yield call(AudioManager.remove, payload)
    yield put(soundRoutines.unload.success(payload))
  })
}

export default [handleSoundUnload]
