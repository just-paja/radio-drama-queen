import { getSoundPlayingStatus } from '../selectors'
import { put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../actions'

export function * handleSoundToggle () {
  yield takeEvery(soundRoutines.toggle.TRIGGER, function * ({ payload }) {
    const playing = yield select(getSoundPlayingStatus, payload)
    if (playing) {
      yield put(soundRoutines.stop(payload))
    } else {
      yield put(soundRoutines.play(payload))
    }
  })
}

export default [
  handleSoundToggle
]
