import { call, takeEvery } from '@redux-saga/core/effects'
import { createQueue } from 'redux-saga-job-queue'
import { moduleRoutines } from '../actions'
import { request } from '../../ipcActionPipe'

let queue

const isQueueRunning = () => queue && !queue.isFinished()

function * loadModuleConfig ({ payload }) {
  yield request(moduleRoutines.load, payload)
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
