export function soundRegister (soundManager) {
  return function (messenger, routine, action) {
    return soundManager.registerSound(action.payload)
      .then(sound => soundManager.describeSound(sound)
        .then(sound => messenger.sendMessage(routine.success(sound)))
        .catch(error => {
          messenger.sendMessage(routine.failure(error.message, sound.uuid))
        })
      )
  }
}

export function soundRead (soundManager) {
  return (messenger, routine, action) =>
    soundManager.getSoundDataUrl(action.payload)
      .then(dataUrl => messenger.sendMessage(routine.success({
        dataUrl,
        uuid: action.payload.uuid
      })))
      .catch(error => messenger.sendMessage(routine.failure(error.message, action.payload.uuid)))
}
