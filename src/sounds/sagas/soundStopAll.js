import { call, select, takeEvery } from 'redux-saga/effects'

import { soundList } from '../actions'
import { getPlayingSoundsUuids } from '../selectors'
import { stopSoundGroup } from './soundStop'

function * stopAllSounds () {
  const sounds = yield select(getPlayingSoundsUuids)
  yield call(stopSoundGroup, { payload: { sounds } })
}

function * handleSoundStopAll () {
  yield takeEvery(soundList.STOP_ALL, stopAllSounds)
}

export default [
  handleSoundStopAll
]
