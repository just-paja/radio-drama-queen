import { call, put, take, takeEvery } from 'redux-saga/effects';

import { createQueue } from 'redux-saga-job-queue';
import { soundList, soundRegister } from '../actions';
import { tagList } from '../../soundTags/actions';
import { matchSoundLoadFinish } from './soundLoad';

const ipcRenderer = global.require('electron').ipcRenderer;

let queue;

const isQueueRunning = () => Boolean(queue && !queue.isFinished());

function* registerSound({ payload }) {
  yield put(soundRegister.request(null, payload));
  ipcRenderer.send('frontendSays', soundRegister.request(null, payload));
  yield take(matchSoundLoadFinish(soundRegister));
}

function* addSound({ payload }) {
  const { tags, ...sound } = payload;
  yield put(tagList.addGroup(tags));
  yield put(soundList.put({
    ...sound,
    tags: tags
      .map(tag => tag.name)
      .filter((item, index, source) => source.indexOf(item) === index),
  }));
}

function* registerSoundInQueue({ payload }) {
  const items = [payload];
  if (isQueueRunning()) {
    yield call(queue.addItems, items);
  } else {
    queue = createQueue({
      concurrency: 10,
      jobFactory: registerSound,
      items,
    });
    yield call(queue.run);
  }
}

function* handleSoundRegister() {
  yield takeEvery(soundRegister.TRIGGER, registerSoundInQueue);
}

function* handleSoundRegisterSuccess() {
  yield takeEvery(soundRegister.SUCCESS, addSound);
}

export default [
  handleSoundRegister,
  handleSoundRegisterSuccess,
];
