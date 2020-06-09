import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../actions'
import { getAllUnusedSoundsByTag } from '../selectors'
import { tagStore } from '../../soundTags'

function * addTagToCategory ({ payload, meta: { uuid } }) {
  const tag = yield select(tagStore.getObject, payload)
  if (tag) {
    const sounds = yield select(getAllUnusedSoundsByTag, payload)
    const cachePaths = sounds.map(sound => sound.cachePath)
    yield all(
      cachePaths.map(soundCachePath =>
        put(categoryRoutines.soundAdd(uuid, soundCachePath))
      )
    )
  }
}

function * handleTagAdd () {
  yield takeEvery(categoryRoutines.tagAdd.TRIGGER, addTagToCategory)
}

export default [handleTagAdd]
