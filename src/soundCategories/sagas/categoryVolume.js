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

function * handleCategoryMuteToggle () {
  yield takeEvery(categoryRoutines.toggleMute.SUCCESS, function * ({ payload: { uuid } }) {
    const muted = yield select(getCategoryMutedStatus, uuid)
    const volume = muted ? 0 : yield select(getCategoryVolume, uuid)
    yield call(setCategorySoundsVolume, uuid, volume)
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
  handleCategoryMuteToggle
]
