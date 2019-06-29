import {
  put,
  select,
  takeEvery
} from 'redux-saga/effects'

import { workspaceRoutines } from '../actions'
import { VIEW_LIBRARY } from '../constants'
import { galleryTarget } from '../../soundGallery/actions'
import { getGalleryTarget } from '../../soundGallery/selectors'

function * setTarget ({ payload, meta }) {
  if (meta && payload === VIEW_LIBRARY && meta.target) {
    yield put(galleryTarget.set(meta.target))
  } else {
    const target = yield select(getGalleryTarget)
    if (target.board || target.category) {
      yield put(galleryTarget.clear())
    }
  }
}

function * goBack () {
  const target = yield select(getGalleryTarget)
  yield put(workspaceRoutines.selectBoard(target.board))
}

function * handleGoBack () {
  yield takeEvery(workspaceRoutines.goBack.TRIGGER, goBack)
}

function * handleViewChange () {
  yield takeEvery([
    workspaceRoutines.selectBoard.TRIGGER,
    workspaceRoutines.selectView.TRIGGER
  ], setTarget)
}

export default [
  handleViewChange,
  handleGoBack
]
