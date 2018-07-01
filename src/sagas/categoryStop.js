import {
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { categoryList, soundList } from '../actions';
import { getCategorySoundPlayingUuids } from '../selectors';

function* categoryStop({ meta: { uuid } }) {
  const playingSounds = yield select(getCategorySoundPlayingUuids, uuid);
  yield all(playingSounds.map(soundUuid => put(soundList.stop(soundUuid))));
}

function* handleCategoryCreateStop() {
  yield takeLatest(categoryList.STOP, categoryStop);
}

export default [
  handleCategoryCreateStop,
];
