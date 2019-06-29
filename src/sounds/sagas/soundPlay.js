import { call, put, select, takeEvery } from 'redux-saga/effects'
import { getSoundLoopStatus, getSoundPlayingStatus } from '../selectors'
import { soundRoutines } from '../actions'

import AudioManager from '../AudioManager'

export function * handleSoundPlay () {
  yield takeEvery(soundRoutines.play.TRIGGER, function * ({ payload }) {
    let playing = true
    while (playing) {
      yield call(AudioManager.play, payload)
      const soundPlaying = yield select(getSoundPlayingStatus, payload)
      const soundLoop = yield select(getSoundLoopStatus, payload)
      playing = soundPlaying
        ? soundLoop
        : false
    }
    yield put(soundRoutines.play.fulfill(payload))
  })
}

export default [
  handleSoundPlay
]
