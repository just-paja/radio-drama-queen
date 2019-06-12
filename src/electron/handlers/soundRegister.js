module.exports = soundManager => (messenger, routine, action) =>
  soundManager.registerSound(action.payload)
    .then(sound => soundManager.describeSound(sound)
      .then(sound => messenger.sendMessage(routine.success(sound.uuid, sound)))
      .catch(error => {
        console.error(error)
        messenger.sendMessage(routine.failure(sound.uuid, error.message))
      })
    )
