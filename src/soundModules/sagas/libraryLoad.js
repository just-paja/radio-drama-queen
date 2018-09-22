import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { startSubmit, stopSubmit, formValueSelector } from 'redux-form';

import { getModuleShape } from '../modulePaths';
import { downloadConfig } from '../../LocalAssetsManager';
import { FORM_LIBRARY_OPEN } from '../constants';
import { libraryLoad, soundModule } from '../actions';

const getLibraryOpenValues = formValueSelector(FORM_LIBRARY_OPEN);

function* openLibrary() {
  yield put(startSubmit(FORM_LIBRARY_OPEN));
  const url = yield select(getLibraryOpenValues, 'url');
  const errors = {};
  try {
    const config = yield call(downloadConfig, url);
    yield put(libraryLoad.success({
      rootModule: getModuleShape(url, config, 'root'),
      url,
    }));
  } catch (error) {
    errors.url = error;
  }
  yield put(stopSubmit(FORM_LIBRARY_OPEN, errors));
  yield put(libraryLoad.fulfill());
}

function* loadLibraryModules({ payload: { rootModule } }) {
  yield put(libraryLoad.dialogHide());
  yield put(soundModule.add(rootModule));
}

function* handleLibraryOpen() {
  yield takeEvery(libraryLoad.SUBMIT, openLibrary);
}

function* handleLibraryLoadSuccess() {
  yield takeEvery(libraryLoad.SUCCESS, loadLibraryModules);
}

export default [
  handleLibraryOpen,
  handleLibraryLoadSuccess,
];
