import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';
import { createQueue } from 'redux-saga-job-queue';

import { downloadConfig } from '../../LocalAssetsManager';
import { soundModule } from '../actions';
import { getModule } from '../selectors';

// import { getModulesStructure } from '../modulePaths';

let queue;

function* loadModuleConfig({ payload: moduleName }) {
  const { name, url } = yield select(getModule, moduleName);
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

function* loadModules({ meta: { name } }) {
  const moduleNames = name instanceof Array ? name : [name];

  if (!queue || queue.isFinished()) {
    queue = createQueue({
      jobFactory: loadModuleConfig,
      items: moduleNames,
    });
    yield call(queue.run);
  } else {
    yield call(queue.addItems, moduleNames);
  }
}

// function* downloadConfigModules({ payload }) {
//   yield call(loadModules, { payload: payload.modules });
// }

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

// function* loadModuleTags(action) {
//   const module = action.meta;
//   const moduleTags = module.tags || [];
//   const tags = module.sounds
//     ? module.sounds.reduce((aggr, sound) => {
//       const newTags = sound.tags
//         .filter(tag => !aggr.find(moduleTag => moduleTag.name === tag))
//         .map(name => ({ name }));
//       return newTags.length === 0
//         ? aggr
//         : [...aggr, ...newTags];
//     }, moduleTags)
//     : moduleTags;
//   yield all(tags.map(payload => put(tagList.create(payload.name, payload))));
// }

// function* loadModuleResources(action) {
//   const module = action.meta;
//   yield call(loadModuleTags, action);
//   console.log(module);
//   if (module.modules) {
//     console.log(getModulesStructure(module.url, module.modules));
//     yield call(loadModules, { payload: getModulesStructure(module.url, module.modules) });
//   }
//   // const module = yield select(getModule, action.payload);
//   // yield all(module.sounds.map(sound => call(addModuleSound, {
//   //   payload: sound,
//   //   meta: { module },
//   // })));
// }

function* handleModuleLoad() {
  yield takeEvery(soundModule.LOAD_TRIGGER, loadModules);
}

export default [
  handleModuleLoad,
];
