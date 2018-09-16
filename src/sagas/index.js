import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import notifications from './notifications';
import soundCategories from '../soundCategories/sagas';
import soundModules from '../soundModules/sagas';
import sounds from '../sounds/sagas';
import tags from '../tags/sagas';

const sagas = [
  ...soundCategories,
  ...notifications,
  ...soundModules,
  ...sounds,
  ...tags,
];

function* onEachError(next, error) {
  yield logWarning(error);
}

function* onFail(error) {
  yield logError(error);
}

export function* serverSagas() {
  yield all(sagas.map(saga => call(saga)));
}

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(keepAlive(saga, {
    onEachError,
    onFail,
  }))));
}
