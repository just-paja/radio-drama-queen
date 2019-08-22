import { PATH_WORKERS } from '../paths'
import { moduleRoutines } from '../../soundModules/actions'

import path from 'path'
import workerpool from 'workerpool'

const workers = workerpool.pool(path.join(
  PATH_WORKERS,
  'modules.js'
))

export function loadLibrary (action, messenger) {
  return workers.exec('readLibrary', [action.payload])
    .then((library) => {
      messenger.handleIncomingAction(moduleRoutines.load.request(library))
      return library
    })
}
