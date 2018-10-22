import {
  all,
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceLoad } from '../actions';
import { getUsedSounds, getWorkspaceFilePath } from '../selectors';
import { soundList } from '../../sounds/actions';

import { readFile } from '../../LocalAssetsManager';

function* load() {
  yield put(workspaceLoad.request());
  try {
    const path = yield select(getWorkspaceFilePath);
    const content = yield call(readFile, path);
    yield put(workspaceLoad.reset(JSON.parse(content)));
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

function* loadSounds() {
  const sounds = yield select(getUsedSounds);
  console.log(sounds);
  yield all(sounds.map(sound => put(soundList.loadTrigger(sound.uuid))));
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
