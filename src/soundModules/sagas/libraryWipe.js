import { put, takeEvery } from 'redux-saga/effects';

import { libraryWipe, soundModule } from '../actions';
import { tagList } from '../../tags/actions';
import { soundList } from '../../sounds/actions';

function* wipeLibrary() {
  yield put(soundList.clear());
  yield put(tagList.clear());
  yield put(soundModule.clear());
  yield put(libraryWipe.success());
}

function* handleLibraryWipe() {
  yield takeEvery(libraryWipe.TRIGGER, wipeLibrary);
}

export default [
  handleLibraryWipe,
];
