import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import categoryCreate from './categoryCreate';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import libraryOpen from './libraryOpen';
import librarySave from './librarySave';
import modules from './modules';
import notifications from './notifications';
import soundDrop from './soundDrop';
import sounds from '../sounds/sagas';
import tags from './tags';

const sagas = [
  ...categoryCreate,
  ...categoryStop,
  ...categoryVolume,
  ...libraryOpen,
  ...librarySave,
  ...modules,
  ...notifications,
  ...soundDrop,
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
