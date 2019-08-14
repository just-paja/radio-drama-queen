import { put, select, takeEvery } from 'redux-saga/effects'

import { soundRoutines } from '../actions'
import { getPlayingSounds } from '../selectors'

function * handleSoundStopAll () {
  yield takeEvery(soundRoutines.stopAll.TRIGGER, function * () {
    const sounds = yield select(getPlayingSounds)
    yield put(soundRoutines.stop(sounds.map(sound => sound.uuid)))
  })
}

export default [
  handleSoundStopAll
]
