import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryList } from '../actions'
import { getCategory, getSoundCategories } from '../selectors'

function * handleCategorySoundDrop () {
  yield takeEvery(categoryList.SOUND_DROP, function * ({ payload, meta: { uuid } }) {
    const dropItem = payload.getItem()
    const category = yield select(getCategory, uuid)

    if (category) {
      const soundCategories = yield select(getSoundCategories, dropItem.uuid)
      yield all(soundCategories.map(soundCategory => put(categoryList.soundRemove(
        soundCategory.uuid,
        dropItem.uuid
      ))))
      yield put(categoryList.soundAdd(category.uuid, dropItem.uuid))
    }
  })
}

export default [handleCategorySoundDrop]
