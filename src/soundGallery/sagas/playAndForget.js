import { put, take, takeEvery } from 'redux-saga/effects';

import { gallerySound } from '../actions';
import { soundList } from '../../sounds/actions';

function* playAndForget({ payload }) {
  yield put(soundList.loadTrigger(payload));
  // @FIXME: This take action matcher absolutely needs to check sound UUID!
  yield take(soundList.LOAD_SUCCESS);
  yield put(soundList.play(payload));
}

function* handleSoundPlay() {
  yield takeEvery(gallerySound.PLAY, playAndForget);
}

export default [
  handleSoundPlay,
];
