import { put, takeEvery } from 'redux-saga/effects'

export function closeDialog (routine, dialog) {
  return function * handleDialogClose () {
    yield takeEvery(routine.SUCCESS, function * () {
      yield put(dialog.close())
    })
  }
}
