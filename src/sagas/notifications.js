import generateUuid from 'uuid/v4';

import { put, takeLatest } from 'redux-saga/effects';

import { notify } from '../actions';

function* addNotification(action) {
  yield put(notify.add(action.payload, generateUuid()));
}

function* handleCategoryCreateSubmit() {
  yield takeLatest(notify.TRIGGER, addNotification);
}

export default [
  handleCategoryCreateSubmit,
];
