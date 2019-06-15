export function soundRead (soundManager) {
  return (messenger, routine, action) =>
    soundManager.getSoundDataUrl(action.payload)
      .then(dataUrl => messenger.sendMessage(routine.success(action.meta.uuid, dataUrl)))
      .catch(error => messenger.sendMessage(routine.failure(action.meta.uuid, error.message)))
}
