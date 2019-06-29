import AudioManager from '../AudioManager'

import { soundList } from '../actions'
import { takeEvery } from 'redux-saga/effects'

const setSoundVolume = (uuid, volume) => {
  const howl = AudioManager.findByUuid(uuid)
  if (howl) {
    howl.sound.volume(volume / 100)
  }
}

function * handleSoundVolumeChange () {
  yield takeEvery(soundList.VOLUME_SET, ({ payload: { volume }, meta: { uuid } }) => {
    setSoundVolume(uuid, volume)
  })
}

function * handleSoundGroupVolumeChange () {
  yield takeEvery(soundList.GROUP_VOLUME_SET, ({ payload: { sounds, volume } }) => {
    sounds.map(uuid => setSoundVolume(uuid, volume))
  })
}

export default [
  handleSoundVolumeChange,
  handleSoundGroupVolumeChange
]
