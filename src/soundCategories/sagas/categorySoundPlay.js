import {
  all,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { categoryList } from '../actions';
import { getSoundCategories } from '../selectors';
import { soundList } from '../../sounds/actions';

function* playCategorySound({ meta: { uuid } }) {
  const soundCategories = yield select(getSoundCategories, uuid);
  yield all(soundCategories
    .filter(category => category.exclusive)
    .map(category => put(categoryList.stop(category.uuid, uuid))));
}

export function* handleCategorySoundPlay() {
  yield takeEvery(soundList.PLAY, playCategorySound);
}

export default [
  handleCategorySoundPlay,
];
