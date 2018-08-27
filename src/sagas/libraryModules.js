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
import { getCategoryByName, getModule, getModules } from '../selectors';
import {
  categoryList,
  categoryCreate,
  library,
} from '../actions';
import { addSound, loadSoundResource } from './soundLoad';

const downloadModuleConfigFactory = ({ allDoneChannel, jobCounter }) => (
  function* downloadModuleConfig({ pack }) {
    yield put(library.moduleDownloadRequest(pack.name));
    try {
      const moduleConfig = yield call(downloadConfig, pack.url);
      yield put(library.moduleDownloadSuccess(pack.name, moduleConfig));
    } catch (error) {
      yield put(library.moduleDownloadFailure(pack.name, error));
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

function* createNewCategory({ payload }) {
  const category = yield select(getCategoryByName, payload);
  if (!category) {
    yield put(categoryCreate.trigger({ name: payload }));
  }
}

function* addSoundToCategoryByName(categoryName, soundUuid) {
  const category = yield select(getCategoryByName, categoryName);
  if (category) {
    yield put(categoryList.soundAdd(category.uuid, soundUuid));
  }
}

const dirname = path => path.match(/.*\//);

function* addModuleSound({ payload, meta: { module } }) {
  const url = `${dirname(module.url)}${payload.file}`;
  const uuid = yield call(addSound, url);
  yield all(payload.tags.map(tag => call(addSoundToCategoryByName, tag, uuid)));
  yield call(loadSoundResource, uuid, url);
}

function* loadModuleSounds(action) {
  const module = yield select(getModule, action.payload);
  const tags = module.sounds.reduce((aggr, sound) => {
    const newTags = sound.tags.filter(tag => aggr.indexOf(tag) === -1);
    if (newTags.length !== 0) {
      return [...aggr, ...newTags];
    }
    return aggr;
  }, []).sort();
  yield all(tags.map(payload => call(createNewCategory, { payload })));
  yield all(module.sounds.map(sound => call(addModuleSound, {
    payload: sound,
    meta: { module },
  })));
}

function* handleLibraryConfigSet() {
  yield takeEvery(library.SET_CONFIG, downloadModules);
}

function* handleModuleLoad() {
  yield takeEvery(library.MODULE_DOWNLOAD_SUCCESS, loadModuleSounds);
}

export default [
  handleLibraryConfigSet,
  handleModuleLoad,
];
