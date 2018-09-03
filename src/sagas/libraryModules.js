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
import {
  getModule,
  getSoundByUrl,
} from '../selectors';
import {
  library,
  tagList,
} from '../actions';
import { addSound, loadSoundResource } from './soundLoad';

// function* addSoundToCategoryByName(categoryName, soundUuid) {
//   const category = yield select(getCategoryByName, categoryName);
//   if (category) {
//     yield put(categoryList.soundAdd(category.uuid, soundUuid));
//   }
// }

const dirname = path => path.match(/.*\//);

function* addModuleSound({ payload, meta: { module } }) {
  const url = `${dirname(module.url)}${payload.file}`;
  const sound = yield select(getSoundByUrl, url);
  if (!sound) {
    const uuid = yield call(addSound, url);
    // yield all(payload.tags.map(tag => call(addSoundToCategoryByName, tag, uuid)));
    yield call(loadSoundResource, uuid, url);
  }
}

function* loadModuleTags(action) {
  const module = yield select(getModule, action.payload);
  const moduleTags = module.tags || [];
  const tags = module.sounds.reduce((aggr, sound) => {
    const newTags = sound.tags
      .filter(tag => !moduleTags.find(moduleTag => moduleTag.name === tag))
      .map(name => ({ name }));
    if (newTags.length !== 0) {
      return [...aggr, ...newTags];
    }
    return aggr;
  }, moduleTags);
  console.log(tags);
  yield all(tags.map(payload => call(tagList.create, null, { payload })));
}

function* loadModuleSounds(action) {
  yield call(loadModuleTags, action);
  const module = yield select(getModule, action.payload);
  yield all(module.sounds.map(sound => call(addModuleSound, {
    payload: sound,
    meta: { module },
  })));
}

function* handleModuleLoad() {
  yield takeEvery(library.MODULE_DOWNLOAD_SUCCESS, loadModuleSounds);
}

export default [
  handleModuleLoad,
];
