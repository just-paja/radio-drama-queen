import { call, put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../actions'
import { soundStore } from '../store'

import AudioManager from '../AudioManager'

export function * handleSoundPlay () {
  yield takeEvery(soundRoutines.play.TRIGGER, function * ({ payload }) {
    let playing = true
    while (playing) {
      yield call(AudioManager.play, payload)
      const sound = yield select(soundStore.getObject, payload)
      playing = sound.playing
        ? sound.loop
        : false
    }
    yield put(soundRoutines.play.fulfill(payload))
  })
}

export default [
  handleSoundPlay
]
