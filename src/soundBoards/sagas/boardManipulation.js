import generateUuid from 'uuid/v4'

import { all, put, select, takeEvery } from 'redux-saga/effects'
import { BoardRenameDialog } from '../components'
import { boardRoutines } from '../actions'
import { boardStore } from '../store'
import { categoryRoutines } from '../../soundCategories'
import { closeDialog } from '../../dialogs'
import { getBoardCategoryUuids } from '../selectors'
import { reflectRoutine } from '../../sagas/reflect'
import { passRequest } from '../../ipcActionPipe'

function * handleBoardRemove () {
  yield takeEvery(boardRoutines.remove.SUCCESS, function * ({ payload }) {
    const categories = yield select(getBoardCategoryUuids, payload)
    yield all(categories.map(categoryUuid => put(categoryRoutines.remove(categoryUuid))))
  })
}

export default [
  closeDialog(boardRoutines.rename, BoardRenameDialog),
  passRequest(boardRoutines.remove),
  passRequest(boardRoutines.create),
  passRequest(boardRoutines.rename)
]
