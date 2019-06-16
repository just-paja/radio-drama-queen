import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { FORM_STORY_CREATE } from './constants'
import { getFormValues } from 'redux-form'
import { isSoundUsed } from '../soundCategories/selectors'
import { matchSoundLoadFinish } from '../sounds/sagas'
import { memoizeSoundList } from '../sounds/selectors'
import { request } from '../ipcActionPipe'
import { soundRegister, soundLoad } from '../sounds/actions'
import { stories, storyCreate, storyLoad, storySave } from './actions'

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

function * loadStory () {
  yield takeEvery(storyLoad.TRIGGER, function * save (action) {
    yield request(storyLoad, action.meta.name)
  })
}

function * reloadSound (sound) {
  yield put(soundRegister.trigger(sound.uuid, sound))
  const result = yield take(matchSoundLoadFinish(soundRegister, sound.uuid))
  if (result.type === soundRegister.SUCCESS) {
    if (yield select(isSoundUsed, sound.uuid)) {
      yield put(soundLoad.trigger(sound.uuid))
      yield take(matchSoundLoadFinish(soundLoad, sound.uuid))
    }
  }
}

function * reloadAllSounds () {
  yield takeEvery(storyLoad.SUCCESS, function * reload () {
    const sounds = yield select(memoizeSoundList)
    yield all(sounds.map(sound => call(reloadSound, sound)))
  })
}

export default [
  createStory,
  fetchStoryList,
  loadStory,
  reloadAllSounds,
  saveStory
]
