import AudioManager from '../AudioManager'

import { call, put, takeEvery, select } from 'redux-saga/effects'
import { createQueue } from 'redux-saga-job-queue'
import { Howl } from 'howler'
import { request } from '../../ipcActionPipe'
import { soundRoutines } from '../actions'
import { soundStore } from '../store'

let queue

const isQueueRunning = () => Boolean(queue && !queue.isFinished())

function loadAudio (uuid, src, format) {
  return new Promise((resolve, reject) => {
    AudioManager.store(uuid, new Howl({
      src,
      format,
      onload: () => {
        try {
          const connector = AudioManager.findByUuid(uuid)
          return resolve({
            duration: connector.sound.duration()
          })
        } catch (e) {
          reject(e)
        }
      },
      onloaderror: (soundId, error) => {
        reject(new Error(error))
      }
    }))
  })
}

export const matchSoundLoadFinish = (routine, uuid) => (action) => {
  if (action) {
    if (action.type === routine.FAILURE) {
      return !uuid || (action.meta && action.meta.uuid === uuid)
    }
    if (action.type === routine.SUCCESS) {
      return !uuid || (action.payload && action.payload.uuid === uuid)
    }
  }
  return false
}

function * readSoundDataUrl ({ payload }) {
  return yield request(
    soundRoutines.read,
    payload,
    matchSoundLoadFinish(soundRoutines.read, payload.uuid)
  )
}

function * loadSoundUrl ({ payload }) {
  try {
    yield put(soundRoutines.load.request(payload))
    const soundData = yield call(readSoundDataUrl, { payload })
    const soundInfo = yield call(loadAudio, payload.uuid, soundData.payload.dataUrl, payload.format)
    yield put(soundRoutines.load.success({
      ...payload,
      ...soundInfo
    }))
  } catch (error) {
    yield put(soundRoutines.load.failure(error, payload.uuid))
  } finally {
    yield put(soundRoutines.load.fulfill(payload.uuid))
  }
}

function * loadSoundInQueue (uuid, sound) {
  const items = [sound]
  if (isQueueRunning()) {
    yield call(queue.addItems, items)
  } else {
    queue = createQueue({
      concurrency: 10,
      jobFactory: loadSoundUrl,
      items
    })
    yield call(queue.run)
  }
}

export function * loadSoundResource (uuid, resource) {
  try {
    if (typeof resource === 'object' && resource.cachePath) {
      yield call(loadSoundInQueue, uuid, resource)
    }
  } catch (e) {
    // FIXME: Cannot just swallow errors like this
    console.error(e)
  }
}

function * handleSoundLoad () {
  yield takeEvery(soundRoutines.load.TRIGGER, function * ({ payload: uuid }) {
    const sound = yield select(soundStore.getFirst, uuid)
    if (sound && !sound.valid) {
      yield call(loadSoundInQueue, uuid, sound)
    }
  })
}

export default [
  handleSoundLoad
]
