import { put, select, take, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit, getFormValues } from 'redux-form'

export const ipcRenderer = global.require && global.require('electron').ipcRenderer

function isSerializable (val) {
  return (
    typeof val === 'undefined' ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    val.constructor === Object
  )
}

export function say (action) {
  /* We check that action payload is serializable to help developers prevent
   * undetectable lockdowns caused by passing React Synthetic Events to the
   * ipcRenderer. This is just a shallow check, it is also possible to do
   * recursive checks, but it would be more expensive.
   */
  if (!isSerializable(action.payload)) {
    throw new Error('Attempted to transmit unserializable payload')
  }
  if (ipcRenderer) {
    return ipcRenderer.send('frontendSays', action)
  }
}

export function * request (routine, payload, matcher) {
  const action = routine.request(payload)
  yield put(action)
  let result
  try {
    say(action)
    result = routine
      ? yield take(matcher || [routine.SUCCESS, routine.FAILURE])
      : null
  } catch (e) {
    yield put(routine.failure(e))
  }
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
