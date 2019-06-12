import { put, select, takeEvery } from 'redux-saga/effects'

import { getSoundPlayingStatus } from '../selectors'
import { soundList } from '../actions'

function * toggleSound ({ meta: { uuid } }) {
  const playing = yield select(getSoundPlayingStatus, uuid)
  if (playing) {
    yield put(soundList.stop(uuid))
  } else {
    yield put(soundList.play(uuid))
  }
}

export function * handleSoundToggle () {
  yield takeEvery(soundList.TOGGLE, toggleSound)
}

export default [
  handleSoundToggle
]
