import AudioManager from '../AudioManager'

import { soundRoutines } from '../actions'
import { takeEvery } from 'redux-saga/effects'

const setSoundVolume = (uuid, volume) => {
  const howl = AudioManager.findByUuid(uuid)
  if (howl) {
    howl.sound.volume(volume / 100)
  }
}

function * handleSoundVolumeChange () {
  yield takeEvery(soundRoutines.setVolume.TRIGGER, ({ payload, meta: { volume } }) => {
    const sounds = payload instanceof Array ? payload : [payload]
    sounds.map(uuid => setSoundVolume(uuid, volume))
  })
}

export default [
  handleSoundVolumeChange
]
