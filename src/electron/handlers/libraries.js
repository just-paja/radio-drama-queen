import { moduleRoutines } from '../../soundModules/actions'

export async function loadLibrary (app, action) {
  const library = await app.workOn('readLibrary', action.payload)
  app.dispatch(moduleRoutines.load.request(library))
  return library
}
