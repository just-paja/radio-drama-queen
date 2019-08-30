import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../actions'
import { getCategory, getSoundCategories } from '../selectors'

function * handleCategorySoundDrop () {
  yield takeEvery(categoryRoutines.soundDrop.TRIGGER, function * ({ payload: categoryUuid, meta: dropTarget }) {
    const dropItem = dropTarget.getItem()
    const category = yield select(getCategory, categoryUuid)

    if (category) {
      const soundCategories = yield select(getSoundCategories, dropItem.uuid)
      yield put(categoryRoutines.soundAdd({
        uuid: category.uuid,
        sound: dropItem.uuid
      }))
      yield all(soundCategories
        .filter(soundCategory => soundCategory.uuid !== category.uuid)
        .map(soundCategory => put(categoryRoutines.soundRemove({
          uuid: soundCategory.uuid,
          sound: dropItem.uuid
        })))
      )
    }
  })
}

export default [handleCategorySoundDrop]
