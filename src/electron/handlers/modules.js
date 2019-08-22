import { moduleRoutines } from '../../soundModules/actions'
import { PATH_WORKERS } from '../paths'
import { soundRoutines } from '../../sounds/actions'

import path from 'path'
import workerpool from 'workerpool'

const workers = workerpool.pool(path.join(
  PATH_WORKERS,
  'modules.js'
))

export function loadModule (action, messenger) {
  return workers.exec('readModule', [action.payload])
    .then((module) => {
      if (module.modules) {
        module.modules.forEach(module => messenger.handleIncomingAction(
          moduleRoutines.load.request(module)
        ))
      }
      if (module.sounds) {
        module.sounds.forEach(sound => messenger.handleIncomingAction(
          soundRoutines.register.request(sound))
        )
      }
      return module
    })
}
