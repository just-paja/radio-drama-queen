import { put, select, take, takeEvery } from 'redux-saga/effects'

import { gallerySound } from '../actions'
import { matchSoundLoadFinish } from '../../sounds/sagas/soundLoad'
import { soundRoutines, soundStore } from '../../sounds'

function * playAndForget ({ payload: soundUuid }) {
  const sound = yield select(soundStore.getObject, soundUuid)
  if (sound) {
    if (sound.playing) {
      yield put(soundRoutines.stop(soundUuid))
    } else {
      yield put(soundRoutines.load(soundUuid))
      yield take(matchSoundLoadFinish(soundRoutines.load, soundUuid))
      yield put(soundRoutines.play(soundUuid))
    }
  }
}

function * handleSoundPlay () {
  yield takeEvery(gallerySound.play.TRIGGER, playAndForget)
}

export default [
  handleSoundPlay
]
