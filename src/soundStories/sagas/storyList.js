import { put, take, takeEvery } from 'redux-saga/effects'

import { stories } from '../actions'

const ipcRenderer = global.require && global.require('electron').ipcRenderer

function * storyListLoad ({ payload }) {
  yield put(stories.request(null, payload))
  ipcRenderer.send('frontendSays', stories.request(null, payload))
  yield take([stories.SUCCESS, stories.FAILURE])
  yield put(stories.fulfill())
}

function * handleStoryListLoad () {
  yield takeEvery(stories.TRIGGER, storyListLoad)
}

export default [
  handleStoryListLoad
]
