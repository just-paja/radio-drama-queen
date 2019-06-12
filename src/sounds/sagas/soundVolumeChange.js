import { takeLatest } from 'redux-saga/effects'

import AudioManager from '../AudioManager'

import { soundList } from '../actions'

const setSoundVolume = (uuid, volume) => {
  const howl = AudioManager.findByUuid(uuid)
  if (howl) {
    howl.sound.volume(volume / 100)
  }
}

const setSoundVolumeByAction = ({ payload: { volume }, meta: { uuid } }) => {
  setSoundVolume(uuid, volume)
}

const setGroupSoundVolume = ({ payload: { sounds, volume } }) => {
  sounds.map(uuid => setSoundVolume(uuid, volume))
}

function * handleSoundVolumeChange () {
  yield takeLatest(soundList.VOLUME_SET, setSoundVolumeByAction)
}

function * handleSoundGroupVolumeChange () {
  yield takeLatest(soundList.GROUP_VOLUME_SET, setGroupSoundVolume)
}

export default [
  handleSoundVolumeChange,
  handleSoundGroupVolumeChange
]
