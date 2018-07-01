import generateUuid from 'uuid/v4';

import { put, select, takeLatest } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';

import { categoryCreate, categoryList } from '../actions';
import { FORM_CATEGORY_CREATE } from '../constants';

function* categoryCreateWithUuid() {
  const values = yield select(getFormValues(FORM_CATEGORY_CREATE));
  yield put(categoryList.add({
    ...values,
    uuid: generateUuid(),
    sounds: [],
  }));
  yield put(categoryCreate.formHide());
}

function* handleCategoryCreateSubmit() {
  yield takeLatest(categoryCreate.SUBMIT, categoryCreateWithUuid);
}

export default [
  handleCategoryCreateSubmit,
];
