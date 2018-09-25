import {
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { categoryList } from '../actions';
import { getCategory, getSoundCategories } from '../selectors';

function* soundMoveToCategory({ payload, meta: { uuid } }) {
  const dropItem = payload.getItem();
  const category = yield select(getCategory, uuid);

  if (category) {
    const soundCategories = yield select(getSoundCategories, dropItem.uuid);
    yield all(soundCategories.map(soundCategory => put(categoryList.soundRemove(
      soundCategory.uuid,
      dropItem.uuid
    ))));
    yield put(categoryList.soundAdd(category.uuid, dropItem.uuid));
  }
}

function* handleGridSoundDrop() {
  yield takeLatest(categoryList.SOUND_DROP, soundMoveToCategory);
}

export default [
  handleGridSoundDrop,
];
