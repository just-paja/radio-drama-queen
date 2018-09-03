import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { startSubmit, stopSubmit, formValueSelector } from 'redux-form';

import { downloadConfig } from '../LocalAssetsManager';
import { FORM_LIBRARY_OPEN } from '../constants';
import { library } from '../actions';
import { getModulesStructure } from './modulePaths';

const getLibraryOpenValues = formValueSelector(FORM_LIBRARY_OPEN);

function* openLibrary() {
  yield put(startSubmit(FORM_LIBRARY_OPEN));
  const url = yield select(getLibraryOpenValues, 'url');
  const errors = {};
  try {
    const config = yield call(downloadConfig, url);
    yield put(library.setConfig({
      ...config,
      modules: getModulesStructure(url, config.modules),
      url,
    }));
    yield put(library.openDialogHide());
  } catch (error) {
    errors.url = error.message;
  }
  yield put(stopSubmit(FORM_LIBRARY_OPEN, errors));
}

function* handleLibraryOpen() {
  yield takeEvery(library.OPEN_DIALOG_SUBMIT, openLibrary);
}

export default [
  handleLibraryOpen,
];
