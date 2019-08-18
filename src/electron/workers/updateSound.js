const ffmpeg = require('fluent-ffmpeg')
const jetpack = require('fs-jetpack')

const { file } = require('tmp-promise')

const logger = {
  debug: (...args) => console.info(...args),
  error: (...args) => console.error(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args)
}

function updateSound (soundData) {
  if (!soundData) {
    return Promise.reject(new Error('You must pass some sound data'))
  }

  const { name, tags } = soundData
  let tempFile
  return file({ postfix: `.${soundData.format}` })
    .then(file => new Promise((resolve, reject) => {
      tempFile = file
      ffmpeg(soundData.cachePath, { logger })
        .audioCodec('copy')
        .outputOptions(
          '-map_metadata',
          '0:s:0',
          '-metadata',
          `title=${name.replace(/\s+/g, ' ')}`,
          '-metadata',
          `TIT1=${tags.map(tag => tag.title).join(', ')}`
        )
        .on('error', (err, stdout, stderr) => {
          console.log(stdout)
          console.log(stderr)
          reject(err)
        })
        .on('end', resolve)
        .save(tempFile.path)
    }))
    .then(() => jetpack.copyAsync(tempFile.path, soundData.cachePath, { overwrite: true }))
    .then(() => tempFile.cleanup())
}

module.exports = {
  updateSound
}
