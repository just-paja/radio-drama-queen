import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { getSoundPlayingStatus } from '../selectors';
import { soundList } from '../actions';

function* playSound({ meta: { uuid } }) {
  yield call(AudioManager.play, uuid);
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
  yield takeLatest(soundList.PLAY, playSound);
}

export function* handleSoundStop() {
  yield takeLatest(soundList.STOP, stopSound);
}

export function* handleSoundToggle() {
  yield takeLatest(soundList.TOGGLE, toggleSound);
}

export default [
  handleSoundPlay,
  handleSoundStop,
  handleSoundToggle,
];
