import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import categoryCreate from './categoryCreate';
import categoryStop from './categoryStop';
import gridSoundDrop from './gridSoundDrop';
import soundPlay from './soundPlay';

const sagas = [
  ...categoryCreate,
  ...categoryStop,
  ...gridSoundDrop,
  ...soundPlay,
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
