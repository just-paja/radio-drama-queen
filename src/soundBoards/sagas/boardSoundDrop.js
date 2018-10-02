import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { soundBoard } from '../actions';
import { getBoard } from '../selectors';
import { createDefaultCategory } from './boardCategoryCreateDefault';
import { categoryList } from '../../soundCategories/actions';
import { getSoundCategories } from '../../soundCategories/selectors';

function* soundMoveToCategory({ payload, meta: { uuid } }) {
  const dropItem = payload.getItem();
  const board = yield select(getBoard, uuid);

  if (board) {
    const category = yield call(createDefaultCategory, uuid);
    const soundCategories = yield select(getSoundCategories, dropItem.uuid);
    yield all(soundCategories
      .filter(soundCategory => soundCategory.board === uuid)
      .map(soundCategory => put(categoryList.soundRemove(
        soundCategory.uuid,
        dropItem.uuid
      ))));
    yield put(categoryList.soundAdd(category.uuid, dropItem.uuid));
  }
}

function* handleGridSoundDrop() {
  yield takeLatest(soundBoard.SOUND_DROP, soundMoveToCategory);
}

export default [
  handleGridSoundDrop,
];
