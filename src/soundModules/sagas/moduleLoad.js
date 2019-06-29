import { call, put, takeEvery, select } from '@redux-saga/core/effects'
import { createQueue } from 'redux-saga-job-queue'
import { downloadConfig } from '../../LocalAssetsManager'
import { moduleRoutines } from '../actions'
import { moduleStore } from '../store'

let queue

const isQueueRunning = () => queue && !queue.isFinished()

function * loadModuleConfig ({ payload: moduleName }) {
  const module = yield select(moduleStore.getFirst, moduleName)
  console.log(moduleName, module)
  if (module) {
    const { name, url } = module
    yield put(moduleRoutines.load.request(name))

    try {
      const moduleConfig = yield call(downloadConfig, url)
      yield put(moduleRoutines.load.success({
        ...moduleConfig,
        name,
        url
      }))
    } catch (error) {
      yield put(moduleRoutines.load.failure(name, error))
    } finally {
      yield put(moduleRoutines.load.fulfill(name))
    }
  }
}

function * handleModuleLoad () {
  yield takeEvery(moduleRoutines.load.TRIGGER, function * ({ payload: name }) {
    const moduleNames = name instanceof Array ? name : [name]

    if (isQueueRunning()) {
      yield call(queue.addItems, moduleNames)
    } else {
      queue = createQueue({
        jobFactory: loadModuleConfig,
        items: moduleNames
      })
      yield call(queue.run)
    }
  })
}

export default [
  handleModuleLoad
]
