import { Howl } from 'howler'
import {
  call,
  put,
  take,
  takeEvery,
  select
} from 'redux-saga/effects'

import AudioManager from '../AudioManager'

import { createQueue } from 'redux-saga-job-queue'
import { soundList, soundLoad, soundRead } from '../actions'
import { getSound } from '../selectors'
import { say } from '../../ipcActionPipe'

let queue

const isQueueRunning = () => Boolean(queue && !queue.isFinished())

const getNameWithoutExtension = filePath => filePath
  .split('/')
  .filter((part, index, source) => index === source.length - 1)
  .join('/')
  .split('.')
  .filter((part, index, source) => index !== source.length - 1)
  .join('.')

const loadFile = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => resolve(reader.result))
  reader.addEventListener('error', () => reject(reader.error))
  reader.readAsDataURL(file)
})

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

function * loadSoundFile (uuid, file) {
  yield put(soundList.setName(
    uuid,
    getNameWithoutExtension(file.name)
  ))
  yield put(soundList.loadRequest(uuid))
  const content = yield call(loadFile, file)
  try {
    yield loadAudio(uuid, content, file.name.split('.').pop().toLowerCase())
    yield put(soundList.loadSuccess(uuid))
  } catch (error) {
    yield put(soundList.loadFailure(uuid, { error }))
  } finally {
    yield put(soundList.loadFulfill(uuid))
  }
}

export const matchSoundLoadFinish = (routine, uuid) => action => (
  action &&
  (
    action.type === routine.SUCCESS ||
    action.type === routine.FAILURE
  ) &&
  action.meta &&
  (
    !uuid ||
    action.meta.uuid === uuid
  )
)

function * readSoundDataUrl ({ payload }) {
  yield put(soundRead.request(payload.uuid, payload))
  say(soundRead.request(payload.uuid, payload))
  const result = yield take(matchSoundLoadFinish(soundRead, payload.uuid))
  yield put(soundRead.fulfill(payload.uuid))
  return result.payload
}

function * loadSoundUrl ({ payload, payload: { format, uuid } }) {
  try {
    yield put(soundLoad.request(uuid, payload))
    const dataUrl = yield call(readSoundDataUrl, { payload })
    const soundInfo = yield call(loadAudio, uuid, dataUrl, format)
    yield put(soundLoad.success(uuid, {
      ...payload,
      ...soundInfo
    }))
  } catch (error) {
    yield put(soundLoad.failure(uuid, error))
  } finally {
    yield put(soundLoad.fulfill(uuid))
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
    if (resource instanceof File) {
      yield call(loadSoundFile, uuid, resource)
    } else if (typeof resource === 'object' && resource.cachePath) {
      yield call(loadSoundInQueue, uuid, resource)
    }
  } catch (e) {
    // FIXME: Cannot just swallow errors like this
    console.error(e)
  }
}

function * loadSoundFromStore ({ meta: { uuid } }) {
  const sound = yield select(getSound, uuid)
  if (sound) {
    if (sound.valid) {
      yield put(soundList.loadSuccess(uuid))
    } else {
      yield call(loadSoundInQueue, uuid, sound)
    }
  }
}

function * handleSoundLoad () {
  yield takeEvery(soundLoad.TRIGGER, loadSoundFromStore)
}

export default [
  handleSoundLoad
]
