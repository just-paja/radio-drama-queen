import generateUuid from 'uuid/v4';

import { Howl } from 'howler';
import { call, put } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { downloadSound } from '../LocalAssetsManager';
import { categoryList, soundList } from '../actions';

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

export function* loadSound(categoryUuid, resource) {
  const uuid = generateUuid();
  yield put(soundList.add({
    name: null,
    path: typeof resource === 'string' ? resource : resource.path,
    uuid,
  }));
  yield put(categoryList.soundAdd(categoryUuid, uuid));
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

export default [
];
