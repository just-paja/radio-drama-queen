import { call, select, takeEvery } from 'redux-saga/effects';

import { library } from '../actions';
import { getLibraryConfig, getLibraryFsPath } from '../selectors';

const jetpack = global.require('fs-jetpack');

const serializeConfig = config => JSON.stringify(config);

function* saveLibrary() {
  const fsPath = yield select(getLibraryFsPath);
  const config = yield select(getLibraryConfig);
  yield call(jetpack.write, fsPath, serializeConfig(config));
}

function* handleLibrarySave() {
  yield takeEvery(library.SAVE, saveLibrary);
}

function* handleLibrarySaveAs() {
  yield takeEvery(library.SAVE_AS_SUBMIT, saveLibrary);
}

export default [
  handleLibrarySave,
  handleLibrarySaveAs,
];
