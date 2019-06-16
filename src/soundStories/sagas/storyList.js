import { FORM_STORY_CREATE } from '../constants'
import { getFormValues } from 'redux-form'
import { request } from '../../ipcActionPipe'
import { put, select, takeEvery } from 'redux-saga/effects'
import { stories, storyCreate } from '../actions'

function * fetchStoryList () {
  yield takeEvery(stories.TRIGGER, function * ({ payload }) {
    yield request(stories, payload)
  })
}

function * createStory () {
  yield takeEvery(storyCreate.SUBMIT, function * () {
    const values = yield select(getFormValues(FORM_STORY_CREATE))
    yield put(stories.add(values))
    yield request(storyCreate, values)
  })
}

export default [
  createStory,
  fetchStoryList
]
