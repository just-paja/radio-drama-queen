import { call, put, select, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../actions'
import { getCategoryMutedStatus, getCategorySoundUuids, getCategoryVolume } from '../selectors'
import { soundRoutines } from '../../sounds'

function * setCategorySoundsVolume (category, volume) {
  const sounds = yield select(getCategorySoundUuids, category)
  if (sounds.length) {
    yield put(soundRoutines.setVolume(sounds, { volume }))
  }
}

function * handleCategoryMute () {
  yield takeEvery(categoryRoutines.mute.SUCCESS, function * ({ payload: { uuid } }) {
    yield call(setCategorySoundsVolume, uuid, 0)
  })
}

function * handleCategoryUnmute () {
  yield takeEvery(categoryRoutines.unmute.SUCCESS, function * ({ payload: { uuid } }) {
    yield call(setCategorySoundsVolume, uuid, yield select(getCategoryVolume, uuid))
  })
}

function * handleCategoryVolumeChange () {
  yield takeEvery(categoryRoutines.setVolume.SUCCESS, function * ({ payload: { uuid, volume } }) {
    if (yield select(getCategoryMutedStatus, uuid)) {
      yield put(categoryRoutines.unmute(uuid))
    }
    yield call(setCategorySoundsVolume, uuid, volume)
  })
}

export default [
  handleCategoryVolumeChange,
  handleCategoryMute,
  handleCategoryUnmute
]
