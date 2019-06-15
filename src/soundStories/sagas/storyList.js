import { FORM_STORY_CREATE } from '../constants'
import { getFormValues } from 'redux-form'
import { put, select, take, takeEvery } from 'redux-saga/effects'
import { stories, storyCreate } from '../actions'

const ipcRenderer = global.require && global.require('electron').ipcRenderer

function * storyListLoad ({ payload }) {
  yield put(stories.request(null, payload))
  ipcRenderer.send('frontendSays', stories.request(null, payload))
  yield take([stories.SUCCESS, stories.FAILURE])
  yield put(stories.fulfill())
}

function * storySave () {
  const values = yield select(getFormValues(FORM_STORY_CREATE))
  yield put(stories.add(values))
  ipcRenderer.send('frontendSays', storyCreate.request(null, values))
  yield take([storyCreate.SUCCESS, storyCreate.FAILURE])
  yield put(storyCreate.fulfill(null, values))
}

function * handleStoryListLoad () {
  yield takeEvery(stories.TRIGGER, storyListLoad)
}

function * handleStoryCreate () {
  yield takeEvery(storyCreate.SUBMIT, storySave)
}

export default [
  handleStoryCreate,
  handleStoryListLoad
]
