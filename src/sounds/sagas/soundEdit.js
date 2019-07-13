import { closeDialog } from '../../dialogs'
import { passRequest } from '../../ipcActionPipe'
import { SoundEditDialog } from '../components'
import { soundRoutines } from '../actions'

export default [
  closeDialog(soundRoutines.edit, SoundEditDialog),
  passRequest(soundRoutines.edit)
]
