const ffmpeg = require('fluent-ffmpeg')
const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { file } = require('tmp-promise')

workerpool.worker({
  updateSound: (soundData) => {
    if (!soundData) {
      return Promise.reject(new Error('You must pass some sound data'))
    }

    const { name } = soundData
    let tempFile
    return file({ postfix: `.${soundData.format}` })
      .then(file => new Promise((resolve, reject) => {
        tempFile = file
        ffmpeg(soundData.cachePath)
          .audioCodec('copy')
          .outputOptions([
            '-metadata', `title=${name.replace(/\s+/g, ' ')}`
          ])
          .on('error', reject)
          .on('end', resolve)
          .save(tempFile.path)
      }))
      .then(() => jetpack.copyAsync(tempFile.path, soundData.cachePath, { overwrite: true }))
      .then(() => tempFile.cleanup())
  }
})
