const noop = () => {};

const clearSoundCallbacks = (sound) => {
  sound.on('end', noop);
  sound.on('stop', noop);
};

class AudioConnector {
  constructor(uuid, sound) {
    this.uuid = uuid;
    this.sound = sound;
  }
}

class AudioManager {
  constructor() {
    this.sounds = [];
    this.play = this.play.bind(this);
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

  play(uuid) {
    const audio = this.findByUuid(uuid);
    if (audio) {
      return new Promise((resolve) => {
        audio.sound.on('end', () => {
          clearSoundCallbacks(audio.sound);
          resolve();
        });
        audio.sound.on('stop', () => {
          clearSoundCallbacks(audio.sound);
          resolve();
        });
        audio.sound.play();
      });
    }
    return Promise.resolve();
  }

  stop(uuid) {
    const audio = this.findByUuid(uuid);
    if (audio) {
      audio.sound.stop();
    }
  }
}

export default new AudioManager();
