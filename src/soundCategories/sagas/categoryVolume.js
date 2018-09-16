import { put, select, takeLatest } from 'redux-saga/effects';

import { categoryList } from '../actions';
import { soundList } from '../../sounds/actions';
import {
  getCategoryMutedStatus,
  getCategorySoundUuids,
  getCategoryVolume,
} from '../selectors';

function* setCategoryVolume({ payload, meta: { uuid } }) {
  const sounds = yield select(getCategorySoundUuids, uuid);
  const muted = yield select(getCategoryMutedStatus, uuid);
  if (muted) {
    yield put(categoryList.unmute(uuid));
  }
  yield put(soundList.groupVolumeSet(null, { sounds, volume: payload }));
}

function* toggleMuteCategory({ meta: { uuid } }) {
  const muted = yield select(getCategoryMutedStatus, uuid);
  const sounds = yield select(getCategorySoundUuids, uuid);
  const volume = muted ? 0 : yield select(getCategoryVolume, uuid);
  yield put(soundList.groupVolumeSet(null, { sounds, volume }));
}

function* handleCategoryMuteToggle() {
  yield takeLatest(categoryList.MUTE_TOGGLE, toggleMuteCategory);
}

function* handleCategoryVolumeChange() {
  yield takeLatest(categoryList.SET_VOLUME, setCategoryVolume);
}

export default [
  handleCategoryVolumeChange,
  handleCategoryMuteToggle,
];
