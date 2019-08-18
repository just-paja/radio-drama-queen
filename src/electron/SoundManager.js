import { PATH_WORKERS } from './paths'
import { SoundStorage } from './SoundStorage'

const generateUuid = require('uuid/v4')
const path = require('path')
const workerpool = require('workerpool')

const soundWorker = workerpool.pool(path.join(
  PATH_WORKERS,
  'sounds.js'
))

/**
 * Class responsible for dispatching the sound actions and retaining all the
 * sounds in memory. Each of its public methods returns a promise.
 */
export class SoundManager {
  constructor () {
    this.describeSound = this.describeSound.bind(this)
    this.readSoundMetaData = this.readSoundMetaData.bind(this)
    this.registerSound = this.registerSound.bind(this)
    this.storage = new SoundStorage()
  }

  readSoundMetaData (soundData) {
    return soundWorker.exec('readSoundMetaData', [soundData])
  }

  /**
   * Adds sound into the application and ensure it is ready to be loaded, then
   * read metadata so it is described in the UI.
   *
   * @return Promise Sound metadata
   */
  registerSound (soundData) {
    return Promise.resolve({
      ...soundData,
      uuid: soundData.uuid || generateUuid()
    })
  }

  /**
   * Read sound metadata so it is described in the UI.
   *
   * @return Promise Sound metadata
   */
  describeSound (soundData) {
    return this.storage
      .storeLocally(soundData)
      .then(this.readSoundMetaData)
  }

  editSound (soundData) {
    return soundWorker.exec('updateSound', [soundData])
      .then(() => this.describeSound(soundData))
  }

  getSoundDataUrl (soundData) {
    return soundWorker.exec('readSoundDataUrl', [soundData])
  }
}
