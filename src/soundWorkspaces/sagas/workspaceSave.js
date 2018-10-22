import {
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { workspaceSave } from '../actions';
import { getWorkspaceFilePath } from '../selectors';

import { writeFile } from '../../LocalAssetsManager';

const stripMemoryState = (state) => ({
  ...state,
  sounds: {
    ...state.sounds,
    list: state.sounds.list.map(sound => ({
      ...sound,
      playing: false,
      loading: false,
      valid: false,
    })),
  },
  soundWorkspaces: {
    ...state.soundWorkspaces,
    save: {
      ...state.soundWorkspaces.save,
      saveAsDialogOpen: false,
    },
    load: {
      ...state.soundWorkspaces.load,
      loadFromDialogOpen: false,
    },
  },
});

function* save() {
  yield put(workspaceSave.request());
  try {
    const path = yield select(getWorkspaceFilePath);
    const state = yield select(state => state);
    yield call(writeFile,path, JSON.stringify(stripMemoryState(state)));
    yield put(workspaceSave.success());
  } catch (error) {
    yield put(workspaceSave.failure(error));
  } finally {
    yield put(workspaceSave.fulfill());
  }
}

function* saveToNewDestination({ payload: { path } }) {
  yield put(workspaceSave.destinationChange(path));
  yield put(workspaceSave.trigger());
  yield take(workspaceSave.SUCCESS);
  yield put(workspaceSave.dialogHide());
}

function* handleSave() {
  yield takeEvery(workspaceSave.TRIGGER, save);
}

function* handleSaveAs() {
  yield takeEvery(workspaceSave.SAVE_AS, saveToNewDestination);
}

export default [
  handleSaveAs,
  handleSave,
];
