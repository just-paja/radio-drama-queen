const workerpool = require('workerpool')

workerpool.worker({
  ...require('./libraries'),
  ...require('./readSoundDataUrl'),
  ...require('./readSoundMetaData'),
  ...require('./stories'),
  ...require('./updateSound')
})
