import { boardRoutines } from '../actions'
import { call, put, select, take, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../../soundCategories'
import { getBoardTargetCategory } from '../selectors'

function * handleBoardCategoryCreate () {
  yield takeEvery(boardRoutines.createCategory.TRIGGER, function * ({ payload: board }) {
    return yield put(categoryRoutines.create({ board }))
  })
}

export function * ensureTargetCategory (board) {
  const existing = yield select(getBoardTargetCategory, board)
  if (existing) {
    return existing
  }
  return yield call(createTargetCategory, board)
}

export function * createTargetCategory (board) {
  yield put(boardRoutines.createCategory(board))
  const result = yield take(categoryRoutines.create.SUCCESS)
  return result.payload
}

export default [
  handleBoardCategoryCreate
]
