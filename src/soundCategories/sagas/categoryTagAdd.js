import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../actions'
import { getAllUnusedSoundsByTag } from '../selectors'
import { tagStore } from '../../soundTags'

function * addTagToCategory ({ payload, meta: { uuid } }) {
  const tag = yield select(tagStore.getObject, payload)
  if (tag) {
    const sounds = yield select(getAllUnusedSoundsByTag, payload)
    const soundUuids = sounds.map(sound => sound.uuid)
    yield all(soundUuids.map(soundUuid => put(categoryRoutines.soundAdd(
      uuid,
      soundUuid
    ))))
  }
}

function * handleTagAdd () {
  yield takeEvery(categoryRoutines.tagAdd.TRIGGER, addTagToCategory)
}

export default [
  handleTagAdd
]
