import keepAlive from 'redux-saga-restart';

import { all, call, fork } from 'redux-saga/effects';
import { logError, logWarning } from '../clientLogger';

import categoryCreate from './categoryCreate';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import libraryModules from './libraryModules';
import libraryOpen from './libraryOpen';
import librarySave from './librarySave';
import notifications from './notifications';
import soundDrop from './soundDrop';
import soundLoad from './soundLoad';
import soundPlay from './soundPlay';

const sagas = [
  ...categoryCreate,
  ...categoryStop,
  ...categoryVolume,
  ...libraryModules,
  ...libraryOpen,
  ...librarySave,
  ...notifications,
  ...soundDrop,
  ...soundLoad,
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
