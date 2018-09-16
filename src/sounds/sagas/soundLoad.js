import generateUuid from 'uuid/v4';

import { Howl } from 'howler';
import { call, put, takeEvery } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { downloadSound } from '../../LocalAssetsManager';
import { soundList } from '../actions';

const getNameWithoutExtension = fileName => fileName
  .split('.')
  .filter((part, index, source) => index !== source.length - 1)
  .join('.');

const loadFile = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result));
  reader.addEventListener('error', () => reject(reader.error));
  reader.readAsDataURL(file);
});

function* loadAudio(uuid, src, format) {
  yield new Promise((resolve, reject) => {
    AudioManager.store(uuid, new Howl({
      src,
      format,
      onload: resolve,
      onloaderror: (soundId, error) => {
        reject(new Error(error));
      },
    }));
  });
}

function* loadSoundFile(uuid, file) {
  yield put(soundList.setName(
    uuid,
    getNameWithoutExtension(file.name)
  ));
  yield put(soundList.loadRequest(uuid));
  const content = yield call(loadFile, file);
  try {
    yield loadAudio(uuid, content, file.name.split('.').pop().toLowerCase());
    yield put(soundList.loadSuccess(uuid));
  } catch (error) {
    yield put(soundList.loadFailure(uuid, { error }));
  }
}

function* loadSoundUrl(uuid, url) {
  yield put(soundList.loadRequest(uuid));
  const soundFile = yield call(downloadSound, uuid, url);
  yield put(soundList.setName(uuid, getNameWithoutExtension(soundFile.name)));
  try {
    yield loadAudio(uuid, soundFile.blob, soundFile.extension);
    yield put(soundList.loadSuccess(uuid));
  } catch (error) {
    yield put(soundList.loadFailure(uuid, error));
  }
}

export function* addSound(resource) {
  const uuid = generateUuid();
  yield put(soundList.add({
    name: null,
    path: typeof resource === 'string' ? resource : resource.path,
    uuid,
  }));
  return uuid;
}

export function* loadSoundResource(uuid, resource) {
  try {
    if (resource instanceof File) {
      yield call(loadSoundFile, uuid, resource);
    } else if (typeof resource === 'string') {
      yield call(loadSoundUrl, uuid, resource);
    }
  } catch (e) {
    // FIXME: Cannot just swallow errors like this
    console.error(e);
  }
}

export function* loadSound(categoryUuid, resource) {
  const uuid = yield call(addSound, resource);
  yield call(loadSoundResource, uuid, resource);
}

function* loadSoundFromAction({ payload }) {
  yield call(loadSound, null, payload);
}

function* handleSoundLoad() {
  yield takeEvery(soundList.LOAD_MANUAL, loadSoundFromAction);
}

export default [
  handleSoundLoad,
];
