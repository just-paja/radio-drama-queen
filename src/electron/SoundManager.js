const electron = require('electron');
const generateUuid = require('uuid/v4');
const path = require('path');
const WorkerNodes = require('worker-nodes');

const exePath = electron.app.getAppPath('exe');

const readSoundMetaData = new WorkerNodes(path.join(
  exePath,
  'src',
  'workers',
  'readSoundMetaData.js'
));

const readSoundDataUrl = new WorkerNodes(path.join(
  exePath,
  'src',
  'workers',
  'readSoundDataUrl.js'
));

const SoundStorage = require('./SoundStorage');

/**
 * Class responsible for dispatching the sound actions and retaining all the
 * sounds in memory. Each of its public methods returns a promise.
 */
class SoundManager {
  constructor() {
    this.describeSound = this.describeSound.bind(this);
    this.readSoundMetaData = this.readSoundMetaData.bind(this);
    this.registerSound = this.registerSound.bind(this);
    this.storage = new SoundStorage();
  }

  readSoundMetaData(soundData) {
    return readSoundMetaData.call(soundData);
  }

  /**
   * Adds sound into the application and ensure it is ready to be loaded, then
   * read metadata so it is described in the UI.
   *
   * @return Promise Sound metadata
   */
  registerSound(soundData) {
    if (soundData.uuid) {
      return Promise.resolve(soundData);
    }
    return Promise.resolve(Object.assign({}, soundData, {
      uuid: generateUuid(),
    }));
  }

  /**
   * Read sound metadata so it is described in the UI.
   *
   * @return Promise Sound metadata
   */
  describeSound(soundData) {
    return this.storage
      .storeLocally(soundData)
      .then(this.readSoundMetaData);
  }

  getSoundDataUrl(soundData) {
    return readSoundDataUrl.call(soundData);
  }
}

module.exports = SoundManager;
