import { closeDialog } from '../../dialogs'
import { passRequest } from '../../ipcActionPipe'
import { SoundEditDialog } from '../components'
import { soundRoutines } from '../actions'

import soundToggle from './soundToggle'

export default [
  closeDialog(soundRoutines.edit, SoundEditDialog),
  passRequest(soundRoutines.edit),
  passRequest(soundRoutines.play),
  passRequest(soundRoutines.stop),
  passRequest(soundRoutines.stopAll),
  ...soundToggle
]
