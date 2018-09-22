import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { startSubmit, stopSubmit, formValueSelector } from 'redux-form';

import { downloadConfig } from '../../LocalAssetsManager';
import { FORM_LIBRARY_OPEN } from '../constants';
import { libraryLoad } from '../actions';

const getLibraryOpenValues = formValueSelector(FORM_LIBRARY_OPEN);

function* openLibrary() {
  yield put(startSubmit(FORM_LIBRARY_OPEN));
  const url = yield select(getLibraryOpenValues, 'url');
  const errors = {};
  try {
    const config = yield call(downloadConfig, url);
    yield put(libraryLoad.success({
      rootModule: config,
      url,
    }));
  } catch (error) {
    errors.url = error;
  }
  yield put(stopSubmit(FORM_LIBRARY_OPEN, errors));
  yield put(libraryLoad.fulfill());
}

function* hideDialog() {
  yield put(libraryLoad.dialogHide());
}

function* handleLibraryOpen() {
  yield takeEvery(libraryLoad.SUBMIT, openLibrary);
}

function* handleLibraryLoadSuccess() {
  yield takeEvery(libraryLoad.SUCCESS, hideDialog);
}

export default [
  handleLibraryOpen,
  handleLibraryLoadSuccess,
];
