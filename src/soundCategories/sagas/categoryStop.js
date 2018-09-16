import { put, select, takeLatest } from 'redux-saga/effects';

import { categoryList } from '../actions';
import { soundList } from '../../sounds/actions';
import { getCategorySoundPlayingUuids } from '../selectors';

function* stopAllCategorySounds({ meta: { uuid }, payload: noStop }) {
  const playingSounds = yield select(getCategorySoundPlayingUuids, uuid);
  const sounds = playingSounds.filter(sound => !noStop || sound !== noStop);
  yield put(soundList.groupStop(null, { sounds }));
}

function* handleCategoryCreateStop() {
  yield takeLatest(categoryList.STOP, stopAllCategorySounds);
}

export default [
  handleCategoryCreateStop,
];
