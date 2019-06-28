const clearSoundCallbacks = (sound) => {
  sound.off('end')
  sound.off('stop')
}

class AudioConnector {
  constructor (uuid, sound) {
    this.uuid = uuid
    this.sound = sound
  }
}

class AudioManager {
  constructor () {
    this.sounds = []
    this.play = this.play.bind(this)
    this.remove = this.remove.bind(this)
  }

  isSoundPlaying (uuid) {
    const sound = this.findByUuid(uuid)
    if (sound) {
      return !!sound.playing
    }
    return false
  }

  store (uuid, object) {
    const connector = new AudioConnector(uuid, object)
    this.sounds.push(connector)
    return connector
  }

  remove (uuid) {
    const soundIndex = this.sounds.findIndex(sound => sound.uuid === uuid)
    if (soundIndex !== -1) {
      const nextState = this.sounds.slice()
      nextState.splice(soundIndex, 1)
      this.sounds[soundIndex].sound.unload()
      this.sounds = nextState
    }
  }

  findByUuid (uuid) {
    return this.sounds.find(sound => sound.uuid === uuid)
  }

  find (...args) {
    return this.sounds.find(...args)
  }

  play (uuid) {
    const audio = this.findByUuid(uuid)
    if (audio) {
      return new Promise((resolve) => {
        const handleSoundFinish = () => {
          audio.playing = false
          clearSoundCallbacks(audio.sound)
          resolve()
        }
        audio.playing = true
        const id = audio.sound.play()
        audio.sound.on('end', handleSoundFinish, id)
        audio.sound.on('stop', handleSoundFinish, id)
        audio.sound.on('playerror', handleSoundFinish, id)
      })
    }
    return Promise.resolve()
  }

  stop (uuid) {
    const audio = this.findByUuid(uuid)
    if (audio) {
      audio.playing = false
      audio.sound.stop()
    }
  }
}

export default new AudioManager()
