import { put, takeLatest } from 'redux-saga/effects';

import { categoryList } from '../actions';
import { soundList } from '../../sounds/actions';

function* loadSound({ payload }) {
  yield put(soundList.loadTrigger(payload));
}

function* handleSoundAdd() {
  yield takeLatest(categoryList.SOUND_ADD, loadSound);
}

export default [
  handleSoundAdd,
];
