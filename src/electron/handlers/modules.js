import { PATH_WORKERS } from '../paths'

import path from 'path'
import workerpool from 'workerpool'

const readModule = workerpool.pool(path.join(
  PATH_WORKERS,
  'readModule.js'
))

export function loadModule (action) {
  return readModule.exec('readModule', [action.payload])
}
