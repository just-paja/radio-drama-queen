import { takeEvery } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { soundList } from '../actions';

function* stopSound({ meta: { uuid } }) {
  yield AudioManager.stop(uuid);
}

function* handleSoundStop() {
  yield takeEvery(soundList.STOP, stopSound);
}

export default [
  handleSoundStop,
];
