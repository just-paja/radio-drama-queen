import { SoundStorage } from '../SoundStorage'

const generateUuid = require('uuid/v4')

export function soundRegister (action, messenger) {
  const soundStorage = new SoundStorage()
  const soundInput = action.payload.uuid ? action.payload : {
    ...action.payload,
    uuid: generateUuid()
  }
  return soundStorage.storeLocally(soundInput)
    .then(sound => messenger.workerPool.exec('readSoundMetaData', [sound]))
}

export function soundEdit (action, messenger) {
  return messenger.workerPool.exec('updateSound', [action.payload])
    .then(() => messenger.workerPool.exec('readSoundMetaData', [action.payload]))
}

export function soundRead (action, messenger) {
  return messenger.workerPool.exec('readSoundDataUrl', [action.payload])
    .then(dataUrl => ({
      dataUrl,
      uuid: action.payload.uuid
    }))
}
