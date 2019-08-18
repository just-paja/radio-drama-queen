import workerpool from 'workerpool'

import { readSoundDataUrl } from './readSoundDataUrl'
import { readSoundMetaData } from './readSoundMetaData'
import { updateSound } from './updateSound'

workerpool.worker({
  readSoundDataUrl,
  readSoundMetaData,
  updateSound
})
