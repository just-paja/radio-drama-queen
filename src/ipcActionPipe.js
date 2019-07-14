import { put, select, take, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit, getFormValues } from 'redux-form'

export const ipcRenderer = global.require && global.require('electron').ipcRenderer

export function say (action) {
  if (ipcRenderer) {
    return ipcRenderer.send('frontendSays', action)
  }
}

export function * request (routine, payload, matcher) {
  const action = routine.request(payload)
  yield put(action)
  say(action)
  const result = routine
    ? yield take(matcher || [routine.SUCCESS, routine.FAILURE])
    : null
  yield put(routine.fulfill(payload))
  return result
}

export function passRequest (routine) {
  return function * passRoutineRequest () {
    yield takeEvery(routine.TRIGGER, function * save ({ payload }) {
      yield request(routine, payload)
    })
  }
}

export function passFormValue (routine, form) {
  const valuesSelector = getFormValues(form)
  return function * () {
    yield takeEvery(routine.TRIGGER, function * () {
      const values = yield select(valuesSelector)
      yield put(startSubmit(form))
      const resultAction = yield request(routine, values)
      const errors = resultAction.type === routine.FAILURE
        ? resultAction.payload
        : null
      yield put(stopSubmit(form, errors))
    })
  }
}

export default (store) => {
  if (ipcRenderer) {
    ipcRenderer.on('backendSays', (event, data) => {
      store.dispatch(data)
    })
  }
}
