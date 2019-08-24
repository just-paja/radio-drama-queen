import { moduleRoutines } from '../../soundModules/actions'
import { soundRoutines } from '../../sounds/actions'

export function loadModule (app, action) {
  return app.workOn('readModule', action.payload)
    .then((module) => {
      if (module.modules) {
        module.modules.forEach(module => app.dispatch(
          moduleRoutines.load.request(module)
        ))
      }
      if (module.sounds) {
        module.sounds.forEach(sound => app.dispatch(
          soundRoutines.register.request(sound))
        )
      }
      return module
    })
}
