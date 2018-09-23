import keepAlive from 'redux-saga-restart';

import { all, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import soundCategories from '../soundCategories/sagas';
import soundGallery from '../soundGallery/sagas';
import soundModules from '../soundModules/sagas';
import sounds from '../sounds/sagas';

const sagas = [
  ...soundCategories,
  ...soundGallery,
  ...soundModules,
  ...sounds,
];

function* onEachError(next, error) {
  yield logWarning(error);
}

function* onFail(error) {
  yield logError(error);
}

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(keepAlive(saga, {
    onEachError,
    onFail,
  }))));
}
