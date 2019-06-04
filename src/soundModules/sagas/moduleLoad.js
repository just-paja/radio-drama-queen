import {
  call,
  put,
  takeEvery,
  select,
} from '@redux-saga/core/effects';
import { createQueue } from 'redux-saga-job-queue';

import { downloadConfig } from '../../LocalAssetsManager';
import { soundModule } from '../actions';
import { getModule } from '../selectors';

let queue;

const isQueueRunning = () => queue && !queue.isFinished();

function* loadModuleConfig({ payload: moduleName }) {
  const module = yield select(getModule, moduleName);
  if (module) {
    const { name, url } = module;
    yield put(soundModule.loadRequest(name));

    try {
      const moduleConfig = yield call(downloadConfig, url);
      yield put(soundModule.loadSuccess(name, {
        ...moduleConfig,
        name,
      }));
    } catch (error) {
      yield put(soundModule.loadFailure(name, error));
    } finally {
      yield put(soundModule.loadFulfill(name));
    }
  }
}

function* loadModules({ meta: { name } }) {
  const moduleNames = name instanceof Array ? name : [name];

  if (isQueueRunning()) {
    yield call(queue.addItems, moduleNames);
  } else {
    queue = createQueue({
      jobFactory: loadModuleConfig,
      items: moduleNames,
    });
    yield call(queue.run);
  }
}

function* handleModuleLoad() {
  yield takeEvery(soundModule.LOAD_TRIGGER, loadModules);
}

export default [
  handleModuleLoad,
];
