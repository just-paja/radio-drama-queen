import {
  all,
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';

import { soundModule } from '../actions';
import { getModule } from '../selectors';
import { tagList } from '../../tags/actions';
import { soundList } from '../../sounds/actions';

import { getHttpDirName, getModuleShape } from '../modulePaths';

function* registerModuleSounds({ meta: { name: moduleName } }) {
  const module = yield select(getModule, moduleName);
  if (module && module.sounds && module.sounds.length !== 0) {
    const { sounds, url } = module;
    yield all(sounds.map(sound => put(soundList.add({
      url: `${getHttpDirName(url)}${sound.file}`,
    }))));
  }
}

function* registerModuleTags({ meta: { name: moduleName } }) {
  const module = yield select(getModule, moduleName);
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
  yield all(tags.map(payload => put(tagList.add(payload))));
}

function* loadSubModules({ meta: { name: moduleName } }) {
  const module = yield select(getModule, moduleName);
  const submodules = module.modules;
  if (submodules && submodules.length !== 0) {
    yield all(submodules.map(submodule => put(soundModule.add(getModuleShape(
      module.url,
      { name: submodule },
      submodule
    )))));
    yield put(soundModule.loadTrigger(submodules));
  }
}

function* integrateModuleResources(action) {
  yield call(registerModuleTags, action);
  yield call(loadSubModules, action);
  yield call(registerModuleSounds, action);
}

function* handleModuleLoadSuccess() {
  yield takeEvery(soundModule.LOAD_SUCCESS, integrateModuleResources);
}

export default [
  handleModuleLoadSuccess,
];
