import {
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { categoryList } from '../actions';
import { soundList } from '../../sounds/actions';
import { getCategorySoundPlayingUuids } from '../selectors';

function* categoryStop({ meta: { uuid }, payload }) {
  const playingSounds = yield select(getCategorySoundPlayingUuids, uuid);
  const stopSounds = playingSounds.filter(sound => !payload || sound !== payload);
  yield all(stopSounds.map(soundUuid => put(soundList.stop(soundUuid))));
}

function* handleCategoryCreateStop() {
  yield takeLatest(categoryList.STOP, categoryStop);
}

export default [
  handleCategoryCreateStop,
];
