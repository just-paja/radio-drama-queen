const workerpool = require('workerpool')

const { readLibrary, readModule } = require('./libraries')
const { readSoundDataUrl } = require('./readSoundDataUrl')
const { readSoundMetaData } = require('./readSoundMetaData')
const { readStory } = require('./stories')
const { updateSound } = require('./updateSound')

workerpool.worker({
  readLibrary,
  readModule,
  readSoundDataUrl,
  readSoundMetaData,
  readStory,
  updateSound
})
