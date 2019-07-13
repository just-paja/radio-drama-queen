import { PATH_WORKERS } from './paths'
import { SoundStorage } from './SoundStorage'

const generateUuid = require('uuid/v4')
const path = require('path')
const workerpool = require('workerpool')

const readSoundMetaData = workerpool.pool(path.join(
  PATH_WORKERS,
  'readSoundMetaData.js'
))

const readSoundDataUrl = workerpool.pool(path.join(
  PATH_WORKERS,
  'readSoundDataUrl.js'
))

const updateSound = workerpool.pool(path.join(
  PATH_WORKERS,
  'updateSound.js'
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
    return readSoundMetaData.exec('readSoundMetaData', [soundData])
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
    return updateSound.exec('updateSound', [soundData])
      .then(() => this.describeSound(soundData))
  }

  getSoundDataUrl (soundData) {
    return readSoundDataUrl.exec('readSoundDataUrl', [soundData])
  }
}
