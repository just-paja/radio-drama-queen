import { put, takeEvery } from 'redux-saga/effects';

import { libraryWipe, soundModule } from '../actions';
import { tagList } from '../../soundTags/actions';
import { soundList } from '../../sounds/actions';
import { categoryList } from '../../soundCategories/actions';

function* wipeLibrary() {
  yield put(soundList.clear());
  yield put(tagList.clear());
  yield put(categoryList.clear());
  yield put(soundModule.clear());
  yield put(libraryWipe.success());
}

function* handleLibraryWipe() {
  yield takeEvery(libraryWipe.TRIGGER, wipeLibrary);
}

export default [
  handleLibraryWipe,
];
