const jetpack = require('fs-jetpack')

function readSoundDataUrl (config, soundData) {
  if (!soundData) {
    return Promise.reject(new Error('You must provide sound data'))
  }

  return jetpack
    .readAsync(soundData.cachePath, 'buffer')
    .then(fileBuffer =>
      `data:audio/${soundData.format};base64,${fileBuffer.toString('base64')}`
    )
}

module.exports = {
  readSoundDataUrl
}
