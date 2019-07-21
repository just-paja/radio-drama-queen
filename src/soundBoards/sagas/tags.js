import { all, put, select, takeEvery } from 'redux-saga/effects'
import { boardRoutines } from '../actions'
import { categoryRoutines } from '../../soundCategories'
import { getAllUnusedSoundsByTag } from '../../soundCategories/selectors'
import { getBoardCategoryByName } from '../selectors'
import { soundRoutines } from '../../sounds'
import { tagStore } from '../../soundTags'

function * handleTagAdd () {
  yield takeEvery(boardRoutines.tagAdd.TRIGGER, function * ({ payload: { uuid, tag } }) {
    const tagObject = yield select(tagStore.getObject, tag)
    if (tagObject) {
      const sounds = yield select(getAllUnusedSoundsByTag, tag)
      const soundUuids = sounds.map(sound => sound.uuid)
      const categoryName = tagObject.title || tagObject.name
      const category = yield select(getBoardCategoryByName, uuid, categoryName)
      if (category) {
        yield all(soundUuids.map(soundUuid => put(categoryRoutines.soundAdd({
          uuid: category.uuid,
          sound: soundUuid
        }))))
      } else {
        yield put(categoryRoutines.create({
          name: categoryName,
          board: uuid,
          sounds: soundUuids
        }))
      }
      yield all(soundUuids.map(soundUuid => put(soundRoutines.load(soundUuid))))
    }
  })
}

export default [
  handleTagAdd
]
