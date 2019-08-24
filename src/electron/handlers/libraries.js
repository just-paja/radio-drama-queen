import { moduleRoutines } from '../../soundModules/actions'

export function loadLibrary (app, action) {
  return app.workOn('readLibrary', action.payload)
    .then((library) => {
      app.dispatch(moduleRoutines.load.request(library))
      return library
    })
}
