class AudioConnector {
  constructor(uuid, sound) {
    this.uuid = uuid;
    this.sound = sound;
  }
}

class AudioManager {
  constructor() {
    this.sounds = [];
  }

  store(uuid, object) {
    const connector = new AudioConnector(uuid, object);
    this.sounds.push(connector);
    return connector;
  }

  remove(uuid) {
    const soundIndex = this.sounds.findIndex(sound => sound.uuid === uuid);
    if (soundIndex !== -1) {
      const nextState = this.sounds.slice();
      nextState.splice(soundIndex, 1);
      this.sounds = nextState;
    }
  }

  findByUuid(uuid) {
    return this.sounds.find(sound => sound.uuid === uuid);
  }

  find(...args) {
    return this.sounds.find(...args);
  }
}

export default new AudioManager();
