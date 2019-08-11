import { PATH_WORKERS } from '../paths'
import { moduleRoutines } from '../../soundModules/actions'

import path from 'path'
import workerpool from 'workerpool'

const readLibrary = workerpool.pool(path.join(
  PATH_WORKERS,
  'readLibrary.js'
))

export function loadLibrary (action, messenger) {
  return readLibrary.exec('readLibrary', [action.payload])
    .then((library) => {
      messenger.handleIncomingAction(moduleRoutines.load.request(library))
      return library
    })
}
