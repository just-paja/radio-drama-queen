const fs = require('./fs')
const crypto = require('crypto')
const path = require('path')

const { cacheFile } = require('./jsonCache')
const { isLocalPath, removeLocalProtocol } = require('./paths')

class SoundStorage {
  constructor (config) {
    this.config = config
  }

  getCachePath (soundData) {
    const fileName = path.basename(soundData.path)
    const cacheRoot = this.config.paths.cache
    const libraryDir = this.hashUrl(soundData.libraryUrl)
    const modulePath = path.join(
      ...soundData.module
        .split(soundData.library)
        .join('')
        .split('/')
    )
    return path.join(cacheRoot, libraryDir, modulePath, fileName)
  }

  hashUrl (dirName) {
    return crypto
      .createHash('md5')
      .update(dirName)
      .digest('hex')
  }

  async storeLocally (soundData) {
    if (isLocalPath(soundData.path)) {
      return Object.assign({}, soundData, {
        cachePath: removeLocalProtocol(soundData.path)
      })
    }
    const cachePath = this.getCachePath(soundData)
    await cacheFile(cachePath, soundData.path)
    return Object.assign({}, soundData, { cachePath })
  }
}

module.exports = {
  SoundStorage
}
