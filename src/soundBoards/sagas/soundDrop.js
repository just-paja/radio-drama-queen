import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { boardRoutines } from '../actions'
import { boardStore } from '../store'
import { categoryRoutines } from '../../soundCategories'
import { createTargetCategory } from './categories'
import { getSoundCategories } from '../../soundCategories/selectors'

function * handleBoardSoundDrop () {
  yield takeEvery(boardRoutines.soundDrop.TRIGGER, function * ({ payload: boardUuid, meta: dropTarget }) {
    const dropItem = dropTarget.getItem()
    const board = yield select(boardStore.getObject, boardUuid)

    if (board) {
      const targetCategory = yield call(createTargetCategory, boardUuid)
      const soundCategories = yield select(getSoundCategories, dropItem.uuid)
      yield all(soundCategories.map(soundCategory => put(categoryRoutines.soundRemove({
        uuid: soundCategory.uuid,
        sound: dropItem.uuid
      }))))
      yield put(categoryRoutines.soundAdd({
        uuid: targetCategory.uuid,
        sound: dropItem.uuid
      }))
    }
  })
}

export default [handleBoardSoundDrop]
