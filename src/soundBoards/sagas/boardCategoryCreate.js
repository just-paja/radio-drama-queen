import { call, put, takeLatest } from 'redux-saga/effects';

import { categoryCreate } from '../actions';
import { createCategory } from '../../soundCategories/sagas';

function* categoryCreateByFormSubmit({ payload, meta: { board } }) {
  yield call(createCategory, {
    payload: {
      ...payload,
      board,
    },
  });
  yield put(categoryCreate.formHide());
}

function* handleCategoryCreate() {
  yield takeLatest(categoryCreate.SUBMIT, categoryCreateByFormSubmit);
}

export default [
  handleCategoryCreate,
];
