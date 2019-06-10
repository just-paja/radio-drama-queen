import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { soundBoard } from '../actions';
import { soundRegister } from '../../sounds/actions';
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
    for (let file of dropItem.files) {
      const soundUuid = yield put(soundRegister, file);
      yield put(categoryList.soundAdd(category.uuid, soundUuid));
    }
  }
}

function* handleGridSoundDrop() {
  yield takeLatest(soundBoard.SOUND_DROP, soundMoveToCategory);
}

export default [
  handleGridSoundDrop,
];
