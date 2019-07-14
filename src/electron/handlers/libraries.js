import { PATH_WORKERS } from '../paths'

import path from 'path'
import workerpool from 'workerpool'

const readLibrary = workerpool.pool(path.join(
  PATH_WORKERS,
  'readLibrary.js'
))

export function loadLibrary () {
  return (messenger, routine, action) =>
    readLibrary.exec('readLibrary', [action.payload])
      .then(stories => messenger.sendMessage(routine.success(stories)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}
