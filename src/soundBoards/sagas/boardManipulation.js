import generateUuid from 'uuid/v4'

import { all, put, select, takeEvery } from 'redux-saga/effects'
import { BoardRenameDialog } from '../components'
import { boardRoutines } from '../actions'
import { boardStore } from '../store'
import { categoryRoutines } from '../../soundCategories'
import { getBoardCategoryUuids } from '../selectors'
import { reflectRoutine } from '../../sagas/reflect'

function * handleBoardCreate () {
  yield takeEvery(boardRoutines.create.TRIGGER, function * () {
    const boards = yield select(boardStore.getAll)
    const maxNumber = boards.reduce((number, board) => {
      const boardNumber = parseInt(board.name.split(' ').pop(), 10)
      return isNaN(boardNumber) || boardNumber < number ? number : boardNumber
    }, 0)
    yield put(boardRoutines.create.success({
      name: `Board ${maxNumber + 1}`,
      uuid: generateUuid()
    }))
  })
}

function * handleBoardRenameSuccessDialog () {
  yield takeEvery(boardRoutines.rename.SUCCESS, function * () {
    yield put(BoardRenameDialog.close())
  })
}

function * handleBoardRemove () {
  yield takeEvery(boardRoutines.remove.TRIGGER, function * ({ payload }) {
    const categories = yield select(getBoardCategoryUuids, payload)
    yield all(categories.map(categoryUuid => put(categoryRoutines.remove(categoryUuid))))
    yield put(boardRoutines.remove.success(payload))
  })
}

export default [
  handleBoardRenameSuccessDialog,
  handleBoardCreate,
  handleBoardRemove,
  reflectRoutine(boardRoutines.rename)
]
