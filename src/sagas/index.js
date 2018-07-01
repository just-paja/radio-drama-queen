import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import categoryCreate from './categoryCreate';
import gridSoundDrop from './gridSoundDrop';

const sagas = [
  ...categoryCreate,
  ...gridSoundDrop,
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
