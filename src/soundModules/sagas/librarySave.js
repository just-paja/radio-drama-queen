import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { FORM_LIBRARY_SAVE_AS } from '../constants';
import { library } from '../actions';
import { getLibraryConfig, getLibraryFsPath } from '../selectors';

const jetpack = global.require('fs-jetpack');

const serializeConfig = config => JSON.stringify(config);

function* saveLibrary() {
  yield put(startSubmit(FORM_LIBRARY_SAVE_AS));
  const fsPath = yield select(getLibraryFsPath);
  const config = yield select(getLibraryConfig);
  const errors = {};
  try {
    yield call(jetpack.write, fsPath, serializeConfig(config));
    yield put(library.saveAsHide());
  } catch (e) {
    errors.fsPath = e.message;
  }
  yield put(stopSubmit(FORM_LIBRARY_SAVE_AS, errors));
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
