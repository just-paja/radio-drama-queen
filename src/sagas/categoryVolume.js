import { select, takeLatest } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { categoryList } from '../actions';
import { getCategorySounds } from '../selectors';

function* setCategoryVolume(action) {
  const { uuid } = action.meta;
  const sounds = yield select(getCategorySounds, uuid);
  const howls = sounds.map(sound => AudioManager.findByUuid(sound.uuid));
  howls.forEach(howl => howl.sound.volume(action.payload / 100));
}

function* handleCategoryVolumeChange() {
  yield takeLatest(categoryList.SET_VOLUME, setCategoryVolume);
}

export default [
  handleCategoryVolumeChange,
];
