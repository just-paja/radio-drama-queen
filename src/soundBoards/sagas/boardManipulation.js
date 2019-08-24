import { all, put, select, takeEvery } from 'redux-saga/effects'
import { BoardRenameDialog } from '../components'
import { boardRoutines } from '../actions'
import { categoryRoutines } from '../../soundCategories'
import { closeDialog } from '../../dialogs'
import { getBoardCategoryUuids } from '../selectors'
import { passRequest } from '../../ipcActionPipe'

function * handleBoardRemove () {
  yield takeEvery(boardRoutines.remove.SUCCESS, function * ({ payload }) {
    const categories = yield select(getBoardCategoryUuids, payload)
    yield all(categories.map(categoryUuid => put(categoryRoutines.remove(categoryUuid))))
  })
}

export default [
  handleBoardRemove,
  closeDialog(boardRoutines.rename, BoardRenameDialog),
  passRequest(boardRoutines.remove),
  passRequest(boardRoutines.create),
  passRequest(boardRoutines.rename)
]
