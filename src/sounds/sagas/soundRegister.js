import { call, put, takeEvery } from 'redux-saga/effects'
import { createQueue } from 'redux-saga-job-queue'
import { matchSoundLoadFinish } from './soundLoad'
import { request } from '../../ipcActionPipe'
import { soundRoutines } from '../actions'
import { tagRoutines } from '../../soundTags'

let queue

const isQueueRunning = () => Boolean(queue && !queue.isFinished())

function * registerSound ({ payload }) {
  yield request(soundRoutines.register, payload, matchSoundLoadFinish(soundRoutines.register))
}

function * registerSoundInQueue ({ payload }) {
  const items = [payload]
  if (isQueueRunning()) {
    yield call(queue.addItems, items)
  } else {
    queue = createQueue({
      concurrency: 10,
      jobFactory: registerSound,
      items
    })
    yield call(queue.run)
  }
}

function * handleSoundRegister () {
  yield takeEvery(soundRoutines.register.TRIGGER, registerSoundInQueue)
}

function * handleNewTags () {
  yield takeEvery(soundRoutines.register.SUCCESS, function * ({ payload: { tags } }) {
    yield put(tagRoutines.register(tags))
  })
}

export default [
  handleSoundRegister,
  handleNewTags
]
