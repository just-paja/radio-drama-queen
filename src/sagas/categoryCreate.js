import generateUuid from 'uuid/v4';

import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { getFormValues } from 'redux-form';

import { categoryCreate, categoryList } from '../actions';
import { FORM_CATEGORY_CREATE } from '../constants';

function* categoryCreateWithUuid({ payload }) {
  yield put(categoryList.add({
    ...payload,
    uuid: generateUuid(),
    sounds: [],
  }));
  yield put(categoryCreate.formHide());
}

function* categoryCreateFromForm() {
  const values = yield select(getFormValues(FORM_CATEGORY_CREATE));
  yield call(categoryCreateWithUuid, { payload: values });
}

function* handleCategoryCreateSubmit() {
  yield takeLatest(categoryCreate.SUBMIT, categoryCreateFromForm);
}

function* handleCategoryCreate() {
  yield takeLatest(categoryCreate.TRIGGER, categoryCreateWithUuid);
}

export default [
  handleCategoryCreate,
  handleCategoryCreateSubmit,
];
