import { call, put, takeEvery } from 'redux-saga/effects'
import { soundList } from '../actions'

import AudioManager from '../AudioManager'

export function * handleSoundUnload () {
  yield takeEvery(soundList.UNLOAD, function * (action) {
    yield call(AudioManager.remove, action.meta.uuid)
    yield put(soundList.unloadSuccess(action))
  })
}

export default [handleSoundUnload]
