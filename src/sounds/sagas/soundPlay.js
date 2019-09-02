import { passRequest } from '../../ipcActionPipe'
import { soundRoutines } from '../actions'

export default [
  passRequest(soundRoutines.play)
]
