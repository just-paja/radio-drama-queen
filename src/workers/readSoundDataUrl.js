const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

workerpool.worker({
  readSoundDataUrl: (soundData) => {
    if (!soundData) {
      return Promise.reject(new Error('You must provide sound data'))
    }

    return jetpack
      .readAsync(soundData.cachePath, 'buffer')
      .then(fileBuffer =>
        `data:audio/${soundData.format};base64,${fileBuffer.toString('base64')}`
      )
  }
})
