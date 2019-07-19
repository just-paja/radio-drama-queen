export function soundRegister (soundManager) {
  return action => soundManager.registerSound(action.payload)
    .then(sound => soundManager.describeSound(sound))
}

export function soundEdit (soundManager) {
  return action => soundManager.editSound(action.payload)
}

export function soundRead (soundManager) {
  return action => soundManager.getSoundDataUrl(action.payload).then(dataUrl => ({
    dataUrl,
    uuid: action.payload.uuid
  }))
}
