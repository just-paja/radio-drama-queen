import { put, select, takeEvery } from 'redux-saga/effects';

import { getTagByName } from '../selectors';
import { tagList } from '../actions';

function* createTag({ payload }) {
  const tag = yield select(getTagByName, payload.name);
  if (!tag) {
    yield put(tagList.add(payload));
  }
}

function* handleTagCreate() {
  yield takeEvery(tagList.CREATE, createTag);
}

export default [
  handleTagCreate,
];
