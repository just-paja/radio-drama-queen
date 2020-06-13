import { SoundStorage } from '../SoundStorage'
import { soundStore } from '../../sounds/store'
import { generateUuid } from '../uuid'

export function soundRegister (app, action) {
  const soundStorage = new SoundStorage(app.config)
  const soundInput = action.payload.uuid
    ? action.payload
    : {
        ...action.payload,
        uuid: generateUuid()
      }
  return soundStorage
    .storeLocally(soundInput)
    .then(sound => app.workOn('readSoundMetaData', sound))
}

export function soundEdit (app, action) {
  return app
    .workOn('updateSound', action.payload)
    .then(() => app.workOn('readSoundMetaData', action.payload))
}

export function soundRead (app, action) {
  return app.workOn('readSoundDataUrl', action.payload).then(dataUrl => ({
    dataUrl,
    uuid: action.payload.uuid
  }))
}

export function soundPlay (app, action) {
  return Promise.all(
    Object.values(app.playbackWindows)
      .filter(window => window.hasSound(action.payload))
      .map(window => window.soundPlay(action.payload))
  )
}

export function soundStop (app, action) {
  return Promise.all(
    Object.values(app.playbackWindows)
      .filter(window => window.hasSound(action.payload))
      .map(window => window.soundStop(action.payload))
  )
}
