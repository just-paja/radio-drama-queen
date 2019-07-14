import { put, takeEvery } from 'redux-saga/effects'

import { storyRoutines } from '../../soundStories'
import { workspaceRoutines } from '../actions'
import { VIEW_LIBRARY } from '../constants'

function * openNewStory () {
  yield takeEvery(storyRoutines.create.SUCCESS, function * (action) {
    yield put(storyRoutines.load(action.payload.uuid))
    yield put(workspaceRoutines.selectView(VIEW_LIBRARY))
  })
}

export default [
  openNewStory
]
