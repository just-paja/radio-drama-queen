import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { workspace } from '../actions';
import { VIEW_LIBRARY } from '../constants';
import { galleryTarget } from '../../soundGallery/actions';
import { getGalleryTarget } from '../../soundGallery/selectors';

function* setTarget({ payload, meta }) {
  if (meta && payload === VIEW_LIBRARY && meta.target) {
    yield put(galleryTarget.set(meta.target));
  } else {
    yield put(galleryTarget.clear());
  }
}

function* goBack() {
  const target = yield select(getGalleryTarget);
  yield put(workspace.selectBoard(target.board));
}

function* handleGoBack() {
  yield takeEvery(workspace.GO_BACK, goBack);
}

function* handleViewChange() {
  yield takeEvery([
    workspace.SELECT_VIEW,
    workspace.SELECT_BOARD,
  ], setTarget);
}

export default [
  handleViewChange,
  handleGoBack,
];
