import generateUuid from 'uuid/v4';

import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga/lib/internal/utils';

// import { logWarning } from '../../clientLogger';
import { categoryList } from '../actions';
// import { loadSound } from '../../sounds/sagas/soundLoad';
// import { getCategory } from '../selectors';

// const filterAudioFile = (file) => {
//   if (file.type.indexOf('audio') !== 0) {
//     logWarning('Not audio!', file);
//     return null;
//   }
//   return file;
// };

function* soundMoveToCategory(action) {
  const dropItem = action.payload.getItem();
  console.log(dropItem);
  yield 'foo';
  // const { uuid } = action.meta;
  // let category = yield uuid
  //   ? select(getCategory, uuid)
  //   : select(getDefaultCategory);
  //
  // if (!category) {
  //   category = yield call(createDefaultCategory);
  // }
  // yield delay(1);
  // if (files) {
  //   yield call(loadSoundFiles, category.uuid, files);
  // }
  // if (urls) {
  //   yield call(loadSoundUrls, category.uuid, urls);
  // }
}

function* handleGridSoundDrop() {
  yield takeLatest(categoryList.FILE_DROP, soundMoveToCategory);
}

export default [
  handleGridSoundDrop,
];
