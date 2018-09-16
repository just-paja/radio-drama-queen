import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { createInteractiveQueue } from 'redux-saga-job-queue';

import { downloadConfig } from '../LocalAssetsManager';
import { library, tagList } from '../actions';

import { getModulesStructure } from './modulePaths';

let queue;

function* downloadModuleConfig({ payload: { name, url } }) {
  yield put(library.moduleDownloadRequest(name));
  try {
    const moduleConfig = yield call(downloadConfig, url);
    yield put(library.moduleDownloadSuccess(name, {
      ...moduleConfig,
      url,
    }));
  } catch (error) {
    yield put(library.moduleDownloadFailure(name, error));
  }
}

function* downloadModules({ payload }) {
  if (!queue || queue.isFinished()) {
    queue = createInteractiveQueue({
      jobFactory: downloadModuleConfig,
      items: payload,
    });
    yield call(queue.run);
  } else {
    console.log('payload', payload);
    yield call(queue.addItems, payload);
  }
}

function* downloadConfigModules({ payload }) {
  yield call(downloadModules, { payload: payload.modules });
}

// function* addSoundToCategoryByName(categoryName, soundUuid) {
//   const category = yield select(getCategoryByName, categoryName);
//   if (category) {
//     yield put(categoryList.soundAdd(category.uuid, soundUuid));
//   }
// }

// function* addModuleSound({ payload, meta: { module } }) {
//   const url = `${dirname(module.url)}${payload.file}`;
//   const sound = yield select(getSoundByUrl, url);
//   if (!sound) {
//     const uuid = yield call(addSound, url);
//     // yield all(payload.tags.map(tag => call(addSoundToCategoryByName, tag, uuid)));
//     yield call(loadSoundResource, uuid, url);
//   }
// }

function* loadModuleTags(action) {
  const module = action.meta;
  const moduleTags = module.tags || [];
  const tags = module.sounds
    ? module.sounds.reduce((aggr, sound) => {
      const newTags = sound.tags
        .filter(tag => !aggr.find(moduleTag => moduleTag.name === tag))
        .map(name => ({ name }));
      return newTags.length === 0
        ? aggr
        : [...aggr, ...newTags];
    }, moduleTags)
    : moduleTags;
  yield all(tags.map(payload => put(tagList.create(payload.name, payload))));
}

function* loadModuleResources(action) {
  const module = action.meta;
  yield call(loadModuleTags, action);
  console.log(module);
  if (module.modules) {
    console.log(getModulesStructure(module.url, module.modules));
    yield call(downloadModules, { payload: getModulesStructure(module.url, module.modules) });
  }
  // const module = yield select(getModule, action.payload);
  // yield all(module.sounds.map(sound => call(addModuleSound, {
  //   payload: sound,
  //   meta: { module },
  // })));
}

function* handleLibraryConfigSet() {
  yield takeEvery(library.SET_CONFIG, downloadConfigModules);
}

function* handleModuleLoad() {
  yield takeEvery(library.MODULE_DOWNLOAD_SUCCESS, loadModuleResources);
}

export default [
  handleLibraryConfigSet,
  handleModuleLoad,
];
