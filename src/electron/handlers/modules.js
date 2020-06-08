import { moduleRoutines } from '../../soundModules/actions'
import { soundRoutines } from '../../sounds/actions'

export async function loadModule (app, action) {
  const mod = await app.workOn('readModule', action.payload)
  if (mod.modules) {
    mod.modules.forEach(mod => app.dispatch(moduleRoutines.load.request(mod)))
  }
  if (mod.sounds) {
    mod.sounds.forEach(sound =>
      app.dispatch(soundRoutines.register.request(sound))
    )
  }
  return mod
}
