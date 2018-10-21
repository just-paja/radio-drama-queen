import { Howl } from 'howler';
import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';

import AudioManager from '../AudioManager';

import { createQueue } from 'redux-saga-job-queue';
import { downloadSound } from '../../LocalAssetsManager';
import { soundList } from '../actions';
import { getSound } from '../selectors';
import { getNameWithoutExtension, registerSound } from './soundAdd';

let queue;

const isQueueRunning = () => Boolean(queue && !queue.isFinished());

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
  } finally {
    yield put(soundList.loadFulfill(uuid));
  }
}

function* loadSoundUrl({ payload: { uuid, url } }) {
  try {
    yield put(soundList.loadRequest(uuid));
    const soundFile = yield call(downloadSound, uuid, url);
    // Not sure about this anymore
    // yield put(soundList.setName(uuid, getNameWithoutExtension(soundFile.name)));
    yield call(loadAudio, uuid, soundFile.blob, soundFile.extension);
    yield put(soundList.loadSuccess(uuid));
  } catch (error) {
    yield put(soundList.loadFailure(uuid, error));
  } finally {
    yield put(soundList.loadFulfill(uuid));
  }
}

function* loadSoundInQueue(uuid, url) {
  const items = [{ uuid, url }];
  if (isQueueRunning()) {
    yield call(queue.addItems, items);
  } else {
    queue = createQueue({
      concurrency: 10,
      jobFactory: loadSoundUrl,
      items,
    });
    yield call(queue.run);
  }
}

export function* loadSoundResource(uuid, resource) {
  try {
    if (resource instanceof File) {
      yield call(loadSoundFile, uuid, resource);
    } else if (typeof resource === 'string') {
      yield call(loadSoundInQueue, uuid, resource);
    }
  } catch (e) {
    // FIXME: Cannot just swallow errors like this
    console.error(e);
  }
}

export function* loadSound(categoryUuid, resource) {
  const uuid = yield call(registerSound, resource);
  yield call(loadSoundResource, uuid, resource);
}

function* loadSoundFromStore({ meta: { uuid } }) {
  const sound = yield select(getSound, uuid);
  if (sound && !sound.valid) {
    yield call(loadSoundInQueue, uuid, sound.path);
  }
}

function* handleSoundLoad() {
  yield takeEvery(soundList.LOAD_TRIGGER, loadSoundFromStore);
}

export default [
  handleSoundLoad,
];
