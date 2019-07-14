import { put, takeEvery } from 'redux-saga/effects'

import { storyRoutines } from '../../soundStories'
import { workspaceRoutines } from '../actions'
import { VIEW_LIBRARY } from '../constants'

function * loadNewStory () {
  yield takeEvery(storyRoutines.create.SUCCESS, function * (action) {
    yield put(storyRoutines.load(action.payload.uuid))
  })
}

function * openEmptyStory () {
  yield takeEvery(storyRoutines.load.SUCCESS, function * (action) {
    if (!action.payload.entities) {
      yield put(workspaceRoutines.selectView(VIEW_LIBRARY))
    }
  })
}

export default [
  loadNewStory,
  openEmptyStory
]
