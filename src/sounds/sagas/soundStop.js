import { takeEvery } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { soundList } from '../actions';

const stopSound = ({ meta: { uuid } }) => {
  AudioManager.stop(uuid);
};

export const stopSoundGroup = ({ payload: { sounds } }) => {
  sounds.map(soundUuid => AudioManager.stop(soundUuid));
};

function* handleSoundStop() {
  yield takeEvery(soundList.STOP, stopSound);
}

function* handleSoundGroupStop() {
  yield takeEvery(soundList.GROUP_STOP, stopSoundGroup);
}

export default [
  handleSoundGroupStop,
  handleSoundStop,
];
