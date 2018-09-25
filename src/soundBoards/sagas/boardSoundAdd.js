import { call, put, takeEvery } from 'redux-saga/effects';

import { soundBoard } from '../actions';
import { soundList } from '../../sounds/actions';
import { categoryList } from '../../soundCategories/actions';
import { createDefaultCategory } from './boardCategoryCreateDefault';

function* addSound({ payload, meta: { uuid } }) {
  const category = yield call(createDefaultCategory, uuid);
  yield put(categoryList.soundAdd(category.uuid, payload));
  yield put(soundList.loadTrigger(payload));
}

function* handleSoundAdd() {
  yield takeEvery(soundBoard.SOUND_ADD, addSound);
}

export default [
  handleSoundAdd,
];
