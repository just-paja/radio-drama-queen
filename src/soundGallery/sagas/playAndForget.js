import { put, select, take, takeEvery } from 'redux-saga/effects';

import { gallerySound } from '../actions';
import { soundLoad, soundList } from '../../sounds/actions';
import { getSound } from '../../sounds/selectors';

function* playAndForget({ payload }) {
  const sound = yield select(getSound, payload);
  if (sound) {
    if (sound.playing) {
      yield put(soundList.stop(payload));
    } else {
      yield put(soundLoad.trigger(payload));
      yield take(action => action.type === soundLoad.FULFILL && action.meta.uuid === payload);
      yield put(soundList.play(payload));
    }
  }
}

function* handleSoundPlay() {
  yield takeEvery(gallerySound.PLAY, playAndForget);
}

export default [
  handleSoundPlay,
];
