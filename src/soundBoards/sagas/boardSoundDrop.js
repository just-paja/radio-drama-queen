import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { categoryList } from '../../soundCategories/actions'
import { createDefaultCategory, createUnnamedCategory } from './boardCategoryCreateDefault'
import { getBoard } from '../selectors'
import { getSoundCategories } from '../../soundCategories/selectors'
import { soundBoard } from '../actions'

function * handleGridSoundDrop () {
  yield takeEvery(soundBoard.SOUND_DROP, function * ({ payload, meta: { uuid } }) {
    const dropItem = payload.getItem()
    const board = yield select(getBoard, uuid)

    if (board) {
      const defaultCategory = yield call(createDefaultCategory, uuid)
      const soundCategories = yield select(getSoundCategories, dropItem.uuid)
      const targetCategory = soundCategories.length
        ? yield call(createUnnamedCategory, uuid)
        : defaultCategory

      yield all(soundCategories
        .filter(soundCategory => soundCategory.board === uuid)
        .map(soundCategory => put(categoryList.soundRemove(
          soundCategory.uuid,
          dropItem.uuid
        ))))
      yield put(categoryList.soundAdd(targetCategory.uuid, dropItem.uuid))
    }
  })
}

export default [handleGridSoundDrop]
