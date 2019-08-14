import { put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../actions'
import { soundStore } from '../store'

export function * handleSoundToggle () {
  yield takeEvery(soundRoutines.toggle.TRIGGER, function * ({ payload }) {
    const playing = yield select(soundStore.getFlag, payload, 'playing')
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
