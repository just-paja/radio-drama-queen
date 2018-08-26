import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { categoryList } from '../actions';
import {
  getCategoryMutedStatus,
  getCategorySounds,
  getCategoryVolume,
} from '../selectors';

const changeSoundsVolume = (sounds, volume) => {
  const howls = sounds.map(sound => AudioManager.findByUuid(sound.uuid));
  howls.forEach(howl => howl.sound.volume(volume / 100));
};

function* setCategoryVolume(action) {
  const { uuid } = action.meta;
  const sounds = yield select(getCategorySounds, uuid);
  const muted = yield select(getCategoryMutedStatus, uuid);
  if (muted) {
    yield put(categoryList.unmute(uuid));
  }
  yield call(changeSoundsVolume, sounds, action.payload);
}

function* toggleMuteCategory(action) {
  const { uuid } = action.meta;
  const muted = yield select(getCategoryMutedStatus, uuid);
  const sounds = yield select(getCategorySounds, uuid);
  const targetVolume = muted ? 0 : yield select(getCategoryVolume, uuid);
  yield call(changeSoundsVolume, sounds, targetVolume);
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
