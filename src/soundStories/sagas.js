import { FORM_STORY_CREATE } from './constants'
import { getFormValues } from 'redux-form'
import { request } from '../ipcActionPipe'
import { put, select, takeEvery } from 'redux-saga/effects'
import { stories, storyCreate, storySave } from './actions'

function stripMemoryState ({ form, soundGallery, ...state }) {
  return {
    ...state,
    name: state.soundWorkspaces.ui.story,
    sounds: {
      ...state.sounds,
      list: state.sounds.list.map(sound => ({
        path: sound.path,
        uuid: sound.uuid
      }))
    },
    soundWorkspaces: {
      ...state.soundWorkspaces,
      save: {
        ...state.soundWorkspaces.save,
        saveAsDialogOpen: false
      },
      load: {
        ...state.soundWorkspaces.load,
        loadFromDialogOpen: false
      }
    }
  }
}

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

function * saveStory () {
  yield takeEvery(storySave.TRIGGER, function * save () {
    yield request(storySave, yield select(stripMemoryState))
  })
}

export default [
  createStory,
  fetchStoryList,
  saveStory
]
