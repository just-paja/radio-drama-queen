import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import categoryCreate from './categoryCreate';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import notifications from './notifications';
import soundDrop from './soundDrop';
import soundModules from '../soundModules/sagas';
import sounds from '../sounds/sagas';
import tags from '../tags/sagas';

const sagas = [
  ...categoryCreate,
  ...categoryStop,
  ...categoryVolume,
  ...notifications,
  ...soundDrop,
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
