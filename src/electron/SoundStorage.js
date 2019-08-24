const path = require('path')
const jetpack = require('fs-jetpack')

const { cacheFile } = require('./jsonCache')
const { isLocalPath, removeLocalProtocol } = require('./paths')

export class SoundStorage {
  constructor (config) {
    this.config = config
  }

  getCachePath (soundData) {
    const fileName = path.basename(soundData.path)
    const cacheRoot = this.config.paths.cache
    const libraryDir = this.hashUrl(this.libraryUrl)
    const modulePath = jetpack.path(...soundData.module.split(soundData.library).join('').split('/'))
    console.log(jetpack.path(cacheRoot, libraryDir, modulePath, fileName))
    return jetpack.path(cacheRoot, libraryDir, modulePath, fileName)
  }

  /**
   * Adds sound into the application and ensure it is ready to be loaded, then
   * read metadata so it is described in the UI.
   *
   * @return Promise Sound metadata
   */
  storeLocally (soundData) {
    if (isLocalPath(soundData.path)) {
      return Promise.resolve(Object.assign({}, soundData, {
        cachePath: removeLocalProtocol(soundData.path)
      }))
    }
    const cachePath = this.getCachePath(soundData)
    if (jetpack.exists(cachePath) === 'file') {
      return Promise.resolve(Object.assign({}, soundData, {
        cachePath
      }))
    }
    return this.downloadSound(soundData).then(this.readSoundMetaData)
  }

  downloadSound (soundData) {
    const { path } = soundData
    const cachePath = this.getCachePath(soundData)
    return cacheFile(cachePath, path).then(cachePath => Object.assign({}, soundData, {
      cachePath
    }))
  }
}
