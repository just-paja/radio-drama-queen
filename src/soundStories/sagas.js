import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { closeDialog } from '../dialogs'
import { FORM_STORY_CREATE } from './constants'
import { getFormValues } from 'redux-form'
import { isSoundUsed } from '../soundCategories/selectors'
import { matchSoundLoadFinish } from '../sounds/sagas'
import { passRequest, request } from '../ipcActionPipe'
import { soundRoutines, soundStore } from '../sounds'
import { storyStore } from './store'
import { StoryCreateDialog, StoryRenameDialog } from './components'
import { storyRoutines } from './actions'

function stripMemoryState ({ form, soundGallery, ...state }) {
  const story = storyStore.getFirst(state, state.soundWorkspaces.ui.story)
  return {
    ...state,
    name: story.name,
    uuid: story.uuid,
    entities: {
      ...state.entities,
      dialogs: undefined,
      stories: undefined,
      sounds: state.entities.sounds.map(sound => ({
        path: sound.path,
        tags: sound.tags,
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
  closeDialog(storyRoutines.create, StoryCreateDialog),
  closeDialog(storyRoutines.rename, StoryRenameDialog),
  handleSoundReload,
  handleStoryCreate,
  handleStorySave,
  passRequest(storyRoutines.list),
  passRequest(storyRoutines.load),
  passRequest(storyRoutines.remove),
  passRequest(storyRoutines.rename)
]
