import { call, select, takeEvery } from 'redux-saga/effects';

import { soundList } from '../actions';
import { getPlayingSounds } from '../selectors';
import { stopSoundGroup } from './soundStop';

function* stopAllSounds() {
  const sounds = yield select(getPlayingSounds);
  yield call(stopSoundGroup, { payload: { sounds } });
}

function* handleSoundStopAll() {
  yield takeEvery(soundList.STOP_ALL, stopAllSounds);
}

export default [
  handleSoundStopAll,
];
