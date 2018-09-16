import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { getSoundLoopStatus, getSoundPlayingStatus } from '../selectors';
import { soundList } from '../actions';

function* playSound({ meta: { uuid } }) {
  // let category = yield select(getSoundCategory, uuid);
  // if (category.exclusive) {
  //   yield put(categoryList.stop(category.uuid, uuid));
  // }
  let playing = true;
  while (playing) {
    yield call(AudioManager.play, uuid);
    const soundPlaying = yield select(getSoundPlayingStatus, uuid);
    const soundLoop = yield select(getSoundLoopStatus, uuid);
    playing = soundPlaying
      ? soundLoop
      : false;
  }
  yield put(soundList.finished(uuid));
}

export function* handleSoundPlay() {
  yield takeEvery(soundList.PLAY, playSound);
}

export default [
  handleSoundPlay,
];
