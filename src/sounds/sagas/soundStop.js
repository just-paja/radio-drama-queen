import AudioManager from '../AudioManager'

import { takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../actions'

function * handleSoundStop () {
  yield takeEvery(soundRoutines.stop.TRIGGER, ({ payload }) => {
    const sounds = payload instanceof Array ? payload : [payload]
    sounds.map(uuid => AudioManager.stop(uuid))
  })
}

export default [
  handleSoundStop
]
