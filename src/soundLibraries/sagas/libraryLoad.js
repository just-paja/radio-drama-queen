import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { downloadConfig } from '../../LocalAssetsManager'
import { FORM_LIBRARY_OPEN } from '../constants'
import { getModuleShape, moduleRoutines } from '../../soundModules'
import { startSubmit, stopSubmit, formValueSelector } from 'redux-form'
import { libraryRoutines } from '../actions'

const getLibraryOpenValues = formValueSelector(FORM_LIBRARY_OPEN)

function * handleLibraryOpen () {
  yield takeEvery(libraryRoutines.load.TRIGGER, function * () {
    yield put(startSubmit(FORM_LIBRARY_OPEN))
    yield put(libraryRoutines.load.request())
    const url = yield select(getLibraryOpenValues, 'url')
    const errors = {}
    try {
      const config = yield call(downloadConfig, url)
      yield put(libraryRoutines.load.success({
        rootModule: getModuleShape(url, {
          ...config,
          url
        }, 'root'),
        url
      }))
    } catch (error) {
      errors.url = error
    }
    yield put(stopSubmit(FORM_LIBRARY_OPEN, errors))
    yield put(libraryRoutines.load.fulfill())
  })
}

function * handleLibraryLoadSuccess () {
  yield takeEvery(libraryRoutines.load.SUCCESS, function * ({ payload: { rootModule } }) {
    yield put(moduleRoutines.register.success(rootModule))
    yield all(rootModule.modules.map(moduleName => put(moduleRoutines.register.success(getModuleShape(
      rootModule.url,
      { name: moduleName }
    )))))
    yield all(rootModule.modules.map(moduleName => put(moduleRoutines.load(moduleName))))
  })
}

export default [
  handleLibraryOpen,
  handleLibraryLoadSuccess
]
