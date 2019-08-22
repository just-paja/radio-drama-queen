import { moduleRoutines } from '../../soundModules/actions'

export function loadLibrary (action, messenger) {
  return messenger.workerPool.exec('readLibrary', [action.payload])
    .then((library) => {
      messenger.dispatch(moduleRoutines.load.request(library))
      return library
    })
}
