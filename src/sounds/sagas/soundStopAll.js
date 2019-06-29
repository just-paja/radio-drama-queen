import { put, select, takeEvery } from 'redux-saga/effects'

import { soundRoutines } from '../actions'
import { getPlayingSoundsUuids } from '../selectors'

function * handleSoundStopAll () {
  yield takeEvery(soundRoutines.stopAll.TRIGGER, function * () {
    const sounds = yield select(getPlayingSoundsUuids)
    yield put(soundRoutines.stop(sounds))
  })
}

export default [
  handleSoundStopAll
]
