import { put, take } from 'redux-saga/effects'

export const ipcRenderer = global.require && global.require('electron').ipcRenderer

export function say (action) {
  return ipcRenderer.send('frontendSays', action)
}

export function * request (routine, payload, matcher) {
  yield put(routine.request(null, payload))
  say(routine.request(null, payload))
  if (routine) {
    yield take(matcher || [routine.SUCCESS, routine.FAILURE])
  }
  yield put(routine.fulfill(null, payload))
}

export default (store) => {
  if (ipcRenderer) {
    ipcRenderer.on('backendSays', (event, data) => {
      store.dispatch(data)
    })
  }
}
