import generateUuid from 'uuid/v4';

import {
  all,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { logWarning } from '../clientLogger';
import { categoryList } from '../actions';
import { loadSound } from './soundLoad';
import { getDefaultCategory } from '../selectors';

function* soundCreateWithCategory(action) {
  const { files } = action.payload.getItem();
  let category = yield select(getDefaultCategory);

  if (!category) {
    category = {
      name: null,
      uuid: generateUuid(),
      sounds: [],
    };
    yield put(categoryList.add(category));
  }

  yield all(files.filter((file) => {
    if (file.type.indexOf('audio') !== 0) {
      logWarning('Not audio!', file);
      return null;
    }
    return file;
  }).map(file => fork(loadSound, category.uuid, file)));
}

function* handleGridSoundDrop() {
  yield takeLatest(categoryList.FILE_DROP, soundCreateWithCategory);
}

export default [
  handleGridSoundDrop,
];
