import { PATH_WORKERS } from '../paths'

import path from 'path'
import workerpool from 'workerpool'

const readModule = workerpool.pool(path.join(
  PATH_WORKERS,
  'readModule.js'
))

export function loadModule () {
  return (messenger, routine, action) =>
    readModule.exec('readModule', [action.payload])
      .then(stories => messenger.sendMessage(routine.success(stories)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}
