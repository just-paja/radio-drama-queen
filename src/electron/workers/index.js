const workerpool = require('workerpool')

const { getDriver } = require('../libraries')
const { readSoundDataUrl } = require('./readSoundDataUrl')
const { readSoundMetaData } = require('./readSoundMetaData')
const { readStory } = require('./readStory')
const { updateSound } = require('./updateSound')

workerpool.worker({
  readLibrary: payload => getDriver(payload.driver).readLibrary(payload),
  readModule: payload => getDriver(payload.driver).readModule(payload),
  readSoundDataUrl,
  readSoundMetaData,
  readStory,
  updateSound
})
