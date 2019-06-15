const electron = require('electron')
const fs = require('fs')
const hash = require('hash.js')
const jetpack = require('fs-jetpack')
const request = require('request')

const isLocalPath = path => path.indexOf('file:') === 0

const removeLocalProtocol = path => path.substr(7)

const splitNameFromExtension = (url) => {
  const fileParts = url.split('/')
  const fileName = fileParts[fileParts.length - 1]
  const fileNameParts = fileName.split('.')
  return {
    name: fileNameParts.join('.'),
    extension: fileNameParts.length > 1 ? fileNameParts.pop() : null
  }
}

const getPath = (...args) => {
  if (electron) {
    return electron.app.getPath(...args)
  }
  return '/var/tmp'
}

/**
 * Class responsible for dispatching the sound actions and retaining all the
 * sounds in memory. Each of its public methods returns a promise.
 */
class SoundStorage {
  constructor () {
    this.pathHome = jetpack.path(getPath('userData'), 'Cache')
  }

  /**
   * Returns universal cache path where to save temporary sounds from
   * the network
   * @return string
   */
  getCachePath (url) {
    const { extension } = splitNameFromExtension(url)
    const sum = hash.sha256().update(url).digest('hex')
    return jetpack.path(this.pathHome, `${sum}.${extension}`)
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

    const cachePath = this.getCachePath(soundData.path)

    if (jetpack.exists(cachePath) === 'file') {
      return Promise.resolve(Object.assign({}, soundData, {
        cachePath
      }))
    }

    return this.downloadSound(soundData).then(this.readSoundMetaData)
  }

  /**
   * Download sound from remote URL into cache path.
   *
   * @return Promise Sound metadata with cachePath
   */
  downloadSound (soundData) {
    const { path } = soundData
    const cachePath = this.getCachePath(path)
    return new Promise((resolve, reject) => {
      let res
      const stream = fs.createWriteStream(cachePath)
      const failAndCleanUp = (error) => {
        stream.close()
        return jetpack.removeAsync(cachePath)
          .then(() => reject(error))
          .catch(reject)
      }
      request(path)
        .on('response', (response) => {
          res = response
        })
        .pipe(stream)
        .on('finish', () => {
          if (!res) {
            failAndCleanUp(new Error(`Did not get any response! ${path}`))
          } else if (res.statusCode < 200 || res.statusCode > 299) {
            failAndCleanUp(new Error(`Server returned status code ${res.statusCode}! ${path}`))
          } else {
            resolve(Object.assign({}, soundData, {
              cachePath
            }))
          }
        })
        .on('error', failAndCleanUp)
    })
  }
}

module.exports = SoundStorage
