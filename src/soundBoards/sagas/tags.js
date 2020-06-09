import { all, put, select, takeEvery } from 'redux-saga/effects'
import { boardRoutines } from '../actions'
import { categoryRoutines } from '../../soundCategories'
import { getAllUnusedSoundsByTag } from '../../soundCategories/selectors'
import { getBoardCategoryByName } from '../selectors'
import { soundRoutines } from '../../sounds'
import { tagStore } from '../../soundTags'

function * handleTagAdd () {
  yield takeEvery(boardRoutines.tagAdd.TRIGGER, function * ({
    payload: { uuid, tag }
  }) {
    const tagObject = yield select(tagStore.getObject, tag)
    if (tagObject) {
      const sounds = yield select(getAllUnusedSoundsByTag, tag)
      const soundCachePaths = sounds.map(sound => sound.cachePath)
      const categoryName = tagObject.title || tagObject.name
      const category = yield select(getBoardCategoryByName, uuid, categoryName)
      if (category) {
        yield all(
          soundCachePaths.map(cachePath =>
            put(
              categoryRoutines.soundAdd({
                uuid: category.uuid,
                sound: cachePath
              })
            )
          )
        )
      } else {
        yield put(
          categoryRoutines.create({
            name: categoryName,
            board: uuid,
            sounds: soundCachePaths
          })
        )
      }
      yield all(
        soundCachePaths.map(cachePath => put(soundRoutines.load(cachePath)))
      )
    }
  })
}

export default [handleTagAdd]
