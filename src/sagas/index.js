import keepAlive from 'redux-saga-restart'

import { all, fork } from 'redux-saga/effects'
import { logError, compatLogWarning } from '../clientLogger'

import soundBoards from '../soundBoards/sagas'
import soundCategories from '../soundCategories/sagas'
import soundGallery from '../soundGallery/sagas'
import soundLibraries from '../soundLibraries/sagas'
import soundModules from '../soundModules/sagas'
import soundStories from '../soundStories/sagas'
import soundWorkspaces from '../soundWorkspaces/sagas'
import sounds from '../sounds/sagas'

const sagas = [
  ...soundBoards,
  ...soundCategories,
  ...soundGallery,
  ...soundLibraries,
  ...soundModules,
  ...soundStories,
  ...soundWorkspaces,
  ...sounds
]

export default function * rootSaga () {
  yield all(sagas.map(saga => fork(keepAlive(saga, {
    maxAttempts: 1,
    onEachError: compatLogWarning,
    onFail: logError
  }))))
}
