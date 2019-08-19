const workerpool = require('workerpool')

const { readSoundDataUrl } = require('./readSoundDataUrl')
const { readSoundMetaData } = require('./readSoundMetaData')
const { updateSound } = require('./updateSound')

workerpool.worker({
  readSoundDataUrl,
  readSoundMetaData,
  updateSound
})
