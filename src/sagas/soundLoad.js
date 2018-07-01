import generateUuid from 'uuid/v4';

import { Howl } from 'howler';
import { call, put } from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { categoryList, soundList } from '../actions';

const loadFile = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result));
  reader.addEventListener('error', () => reject(reader.error));
  reader.readAsDataURL(file);
});

function* loadSoundFile(uuid, file) {
  yield put(soundList.setName(uuid, file.name));
  yield put(soundList.loadRequest(uuid));
  const fileData = yield call(loadFile, file);
  AudioManager.store(uuid, new Howl({
    src: fileData,
    format: file.name.split('.').pop().toLowerCase(),
  }));
  yield put(soundList.loadSuccess(uuid));
}

export function* loadSound(categoryUuid, resource) {
  const uuid = generateUuid();
  yield put(soundList.add({
    name: null,
    uuid,
  }));
  yield put(categoryList.soundAdd(categoryUuid, uuid));
  try {
    if (resource instanceof File) {
      yield call(loadSoundFile, uuid, resource);
    }
  } catch (e) {
    console.error(e);
  }
}

export default [
];
