import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { channel } from 'redux-saga';

import createQueue from './createQueue';
import JobCounter from './JobCounter';

import { downloadConfig } from '../LocalAssetsManager';
import { library } from '../actions';
import { getModules } from '../selectors';

const downloadModuleConfigFactory = ({ allDoneChannel, jobCounter }) => (
  function* downloadModuleConfig({ pack }) {
    yield put(library.moduleDownloadRequest(pack.name));
    console.log(pack);
    try {
      const moduleConfig = yield call(downloadConfig, pack.url);
      yield put(library.moduleDownloadSuccess(moduleConfig));
    } catch (error) {
      yield put(library.moduleDownloadFailure(error));
    }

    jobCounter.add();
    if (jobCounter.total === jobCounter.done) {
      yield allDoneChannel.put({ type: 'DONE' });
    }
  }
);

function* downloadModules() {
  const packages = yield select(getModules);
  const allDoneChannel = yield call(channel);
  const jobCounter = new JobCounter(packages.length);
  const saveImportUser = downloadModuleConfigFactory({ allDoneChannel, jobCounter });
  const { watcher, addTaskChannel } = yield createQueue(saveImportUser, jobCounter);
  yield fork(watcher);
  yield all(packages.map((pack, index) => put(addTaskChannel, { payload: { pack, index } })));
  yield take(allDoneChannel);
}

function* handleLibraryConfigSet() {
  yield takeEvery(library.SET_CONFIG, downloadModules);
}

export default [
  handleLibraryConfigSet,
];
