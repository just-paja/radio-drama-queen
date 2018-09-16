import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { getSoundCategory, getSoundPlayingStatus } from '../selectors';
import { soundList } from '../actions';

function* playSound({ meta: { uuid } }) {
  let category = yield select(getSoundCategory, uuid);
  // if (category.exclusive) {
  //   yield put(categoryList.stop(category.uuid, uuid));
  // }
  let playing = true;
  while (playing) {
    yield call(AudioManager.play, uuid);
    const soundPlaying = yield select(getSoundPlayingStatus, uuid);
    category = yield select(getSoundCategory, uuid);
    playing = soundPlaying
      ? category.loop
      : false;
  }
  yield put(soundList.finished(uuid));
}

function* stopSound({ meta: { uuid } }) {
  yield AudioManager.stop(uuid);
}

function* toggleSound({ meta: { uuid } }) {
  const playing = yield select(getSoundPlayingStatus, uuid);
  if (playing) {
    yield put(soundList.stop(uuid));
  } else {
    yield put(soundList.play(uuid));
  }
}

export function* handleSoundPlay() {
  yield takeEvery(soundList.PLAY, playSound);
}

export function* handleSoundStop() {
  yield takeEvery(soundList.STOP, stopSound);
}

export function* handleSoundToggle() {
  yield takeEvery(soundList.TOGGLE, toggleSound);
}

export default [
  handleSoundPlay,
  handleSoundStop,
  handleSoundToggle,
];
