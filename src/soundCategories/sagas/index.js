import categoryManipulation from './categoryManipulation'
import categoryTagAdd from './categoryTagAdd'
import categoryVolume from './categoryVolume'
import soundDrop from './soundDrop'

import { passRequest } from '../../ipcActionPipe'
import { playbackRoutines } from '../../playback/actions'

export default [
  ...categoryManipulation,
  ...categoryTagAdd,
  ...categoryVolume,
  ...soundDrop,
  passRequest(playbackRoutines.setMuteOn),
  passRequest(playbackRoutines.setMuteOff)
]
