const hash = require('hash.js')
const jetpack = require('fs-jetpack')
const request = require('request')

const { PATH_CACHE } = require('../electron/paths')

function getCachePath (url) {
  const sum = hash.sha256().update(url).digest('hex')
  return jetpack.path(PATH_CACHE, `${sum}.json`)
}

function cacheFile (url) {
  const cachePath = getCachePath(url)

  if (jetpack.exists(cachePath) === 'file') {
    return Promise.resolve(cachePath)
  }

  return new Promise((resolve, reject) => {
    let res
    const stream = jetpack.createWriteStream(cachePath)
    const failAndCleanUp = (error) => {
      stream.close()
      return jetpack.removeAsync(cachePath)
        .then(() => reject(error))
        .catch(reject)
    }
    request(url)
      .on('response', (response) => {
        res = response
      })
      .pipe(stream)
      .on('finish', () => {
        if (!res) {
          failAndCleanUp(new Error(`Did not get any response! ${url}`))
        } else if (res.statusCode < 200 || res.statusCode > 299) {
          failAndCleanUp(new Error(`Server returned status code ${res.statusCode}! ${url}`))
        } else {
          resolve(cachePath)
        }
      })
      .on('error', failAndCleanUp)
  })
}

module.exports = {
  getCachePath,
  cacheFile
}
