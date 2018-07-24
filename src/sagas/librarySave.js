import { call, select, takeEvery } from 'redux-saga/effects';
import { write } from 'fs-jetpack';

import { library } from '../actions';
import { getLibraryConfig, getLibraryFsPath } from '../selectors';

const serializeConfig = config => JSON.stringify(config);

function* saveLibrary() {
  const fsPath = yield select(getLibraryFsPath);
  const config = yield select(getLibraryConfig);
  yield call(write, fsPath, serializeConfig(config));
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
