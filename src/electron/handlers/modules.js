import { moduleRoutines } from '../../soundModules/actions'
import { soundRoutines } from '../../sounds/actions'

export function loadModule (action, messenger) {
  return messenger.workerPool.exec('readModule', [action.payload])
    .then((module) => {
      if (module.modules) {
        module.modules.forEach(module => messenger.dispatch(
          moduleRoutines.load.request(module)
        ))
      }
      if (module.sounds) {
        module.sounds.forEach(sound => messenger.dispatch(
          soundRoutines.register.request(sound))
        )
      }
      return module
    })
}
