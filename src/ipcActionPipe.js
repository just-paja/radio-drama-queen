import { put, take, takeEvery } from 'redux-saga/effects'

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

export default (store) => {
  if (ipcRenderer) {
    ipcRenderer.on('backendSays', (event, data) => {
      store.dispatch(data)
    })
  }
}
