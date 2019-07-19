import { put, takeEvery } from 'redux-saga/effects'
import { FORM_LIBRARY_OPEN } from '../constants'
import { libraryRoutines } from '../actions'
import { OpenLibraryDialog } from '../components'
import { passFormValue } from '../../ipcActionPipe'

function * handleLibraryLoadSuccess () {
  yield takeEvery(libraryRoutines.load.SUCCESS, function * ({ payload: library }) {
    yield put(OpenLibraryDialog.close())
  })
}

export default [
  passFormValue(libraryRoutines.load, FORM_LIBRARY_OPEN),
  handleLibraryLoadSuccess
]
