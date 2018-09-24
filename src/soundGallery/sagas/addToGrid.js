import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { gallerySound } from '../actions';
import { categoryList } from '../../soundCategories/actions';
import { createDefaultCategory } from '../../soundCategories/sagas';

function* addToGrid({ payload }) {
  const category = yield call(createDefaultCategory);
  yield put(categoryList.soundAdd(category.uuid, payload));
}

function* handleSoundAdd() {
  yield takeEvery(gallerySound.ADD_TO_GRID, addToGrid);
}

export default [
  handleSoundAdd,
];
