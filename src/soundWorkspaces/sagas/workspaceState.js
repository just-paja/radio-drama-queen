import { passRequest } from '../../ipcActionPipe'
import { workspaceRoutines } from '../actions'

export default [
  passRequest(workspaceRoutines.load)
]
