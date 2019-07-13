import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { FORM_STORY_CREATE } from './constants'
import { getFormValues } from 'redux-form'
import { isSoundUsed } from '../soundCategories/selectors'
import { matchSoundLoadFinish } from '../sounds/sagas'
import { passRequest, request } from '../ipcActionPipe'
import { soundRoutines, soundStore } from '../sounds'
import { StoryCreateDialog } from './components'
import { storyRoutines } from './actions'

function stripMemoryState ({ form, soundGallery, ...state }) {
  return {
    ...state,
    name: state.soundWorkspaces.ui.story,
    entities: {
      ...state.entities,
      dialogs: undefined,
      sounds: state.entities.sounds.map(sound => ({
        path: sound.path,
        uuid: sound.uuid
      }))
    }
  }
}

function * handleStoryCreate () {
  yield takeEvery(storyRoutines.create.TRIGGER, function * () {
    const values = yield select(getFormValues(FORM_STORY_CREATE))
    yield request(storyRoutines.create, values)
  })
}

function * handleStoryCreateSuccess () {
  yield takeEvery(storyRoutines.create.SUCCESS, function * () {
    yield put(StoryCreateDialog.close())
  })
}

function * handleStorySave () {
  yield takeEvery(storyRoutines.save.TRIGGER, function * save () {
    yield request(storyRoutines.save, yield select(stripMemoryState))
  })
}

function * reloadSound (sound) {
  yield put(soundRoutines.register(sound))
  const result = yield take(matchSoundLoadFinish(soundRoutines.register, sound.uuid))
  if (result.type === soundRoutines.register.SUCCESS) {
    if (yield select(isSoundUsed, sound.uuid)) {
      yield put(soundRoutines.load(sound.uuid))
      yield take(matchSoundLoadFinish(soundRoutines.load, sound.uuid))
    }
  }
}

function * handleSoundReload () {
  yield takeEvery(storyRoutines.load.SUCCESS, function * reload () {
    const sounds = yield select(soundStore.getAll)
    yield all(sounds.map(sound => call(reloadSound, sound)))
  })
}

export default [
  handleSoundReload,
  handleStoryCreate,
  handleStoryCreateSuccess,
  handleStorySave,
  passRequest(storyRoutines.list),
  passRequest(storyRoutines.load),
  passRequest(storyRoutines.remove),
  passRequest(storyRoutines.rename)
]
