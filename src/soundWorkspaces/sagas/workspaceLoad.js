import {
  all,
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceLoad } from '../actions';
import { getWorkspaceFilePath } from '../selectors';
import { soundRegister, soundLoad } from '../../sounds/actions';
import { matchSoundLoadFinish } from '../../sounds/sagas';
import { memoizeSoundList } from '../../sounds/selectors';
import { isSoundUsed } from '../../soundCategories/selectors';

import { readFile } from '../../LocalAssetsManager';

function* load() {
  yield put(workspaceLoad.request());
  try {
    const path = yield select(getWorkspaceFilePath);
    const content = yield call(readFile, path);
    const state = yield select(state => state);
    yield put(workspaceLoad.reset({
      ...state,
      ...JSON.parse(content),
    }));
    yield put(workspaceLoad.success());
  } catch (error) {
    yield put(workspaceLoad.failure(error));
  } finally {
    yield put(workspaceLoad.fulfill());
  }
}

function* loadFromDestination({ payload: { path } }) {
  yield put(workspaceLoad.destinationChange(path));
  yield put(workspaceLoad.trigger());
  yield take(workspaceLoad.SUCCESS);
  yield put(workspaceLoad.dialogHide());
}

function* reloadSound(sound) {
  yield put(soundRegister.trigger(sound.uuid, sound));
  yield take(matchSoundLoadFinish(soundRegister, sound.uuid));
  const isUsed = yield select(isSoundUsed, sound.uuid);
  if (isUsed) {
    yield put(soundLoad.trigger(sound.uuid));
    yield take(matchSoundLoadFinish(soundLoad, sound.uuid));
  }
}

function* loadSounds() {
  const sounds = yield select(memoizeSoundList);
  yield all(sounds.map(sound => call(reloadSound, sound)));
}

function* handleLoad() {
  yield takeEvery(workspaceLoad.TRIGGER, load);
}

function* handleLoadFrom() {
  yield takeEvery(workspaceLoad.LOAD_FROM, loadFromDestination);
}

function* handleSoundReload() {
  yield takeEvery(workspaceLoad.RESET, loadSounds);
}

export default [
  handleLoad,
  handleLoadFrom,
  handleSoundReload,
];
