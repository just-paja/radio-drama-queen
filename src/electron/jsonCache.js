const jetpack = require('fs-jetpack')
const request = require('request')

function cacheFile (cachePath, url) {
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
  cacheFile
}
