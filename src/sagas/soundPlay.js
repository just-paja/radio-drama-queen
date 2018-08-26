import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { getSoundCategory, getSoundPlayingStatus } from '../selectors';
import { soundList } from '../actions';

function* playSoundLoop({ meta: { uuid } }) {
  let playing = true;
  while (playing) {
    yield call(AudioManager.play, uuid);
    const category = yield select(getSoundCategory, uuid);
    const soundPlaying = yield select(getSoundPlayingStatus, uuid);
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
  yield takeEvery(soundList.PLAY, playSoundLoop);
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
