import { put, takeEvery } from 'redux-saga/effects'

export function reflectRoutine (routine) {
  return function * reflectRoutineSaga () {
    yield takeEvery(routine.TRIGGER, function * ({ payload }) {
      yield put(routine.success(payload))
      yield put(routine.fulfill(payload))
    })
  }
}
