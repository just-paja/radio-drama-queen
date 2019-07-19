import { PATH_WORKERS } from '../paths'

import path from 'path'
import workerpool from 'workerpool'

const readLibrary = workerpool.pool(path.join(
  PATH_WORKERS,
  'readLibrary.js'
))

export function loadLibrary (action) {
  return readLibrary.exec('readLibrary', [action.payload])
}
