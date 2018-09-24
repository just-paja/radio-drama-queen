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

export function* categoryCreateWithUuid({ payload }) {
  const category = {
    ...payload,
    uuid: generateUuid(),
    sounds: [],
  };
  yield put(categoryList.add(category));
  yield put(categoryCreate.formHide());
  return category;
}

function* categoryCreateByFormSubmit() {
  const payload = yield select(getFormValues(FORM_CATEGORY_CREATE));
  yield call(categoryCreateWithUuid, { payload });
}

function* handleCategoryCreateSubmit() {
  yield takeLatest(categoryCreate.SUBMIT, categoryCreateByFormSubmit);
}

function* handleCategoryCreate() {
  yield takeLatest(categoryCreate.TRIGGER, categoryCreateWithUuid);
}

export default [
  handleCategoryCreate,
  handleCategoryCreateSubmit,
];
