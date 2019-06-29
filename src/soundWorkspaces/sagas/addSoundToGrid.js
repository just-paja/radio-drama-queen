import { boardRoutines } from '../../soundBoards'
import { call, put, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../../soundCategories'
import { createDefaultBoard } from './createDefaultBoard'
import { workspaceRoutines } from '../actions'

function * addToGrid ({ payload: { board, category, sound } }) {
  if (category) {
    yield put(categoryRoutines.soundAdd({ uuid: category, sound }))
  } else if (board) {
    yield put(boardRoutines.soundAdd({ uuid: board, sound }))
  } else {
    const targetBoard = yield call(createDefaultBoard)
    yield put(boardRoutines.soundAdd({
      uuid: targetBoard.uuid,
      sound
    }))
  }
}

function * handleSoundAdd () {
  yield takeEvery(workspaceRoutines.addSound.TRIGGER, addToGrid)
}

export default [
  handleSoundAdd
]
