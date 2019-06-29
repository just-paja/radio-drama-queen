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
  yield takeEvery(categoryRoutines.toggleMute.TRIGGER, function * ({ payload }) {
    const muted = yield select(getCategoryMutedStatus, payload)
    const volume = muted ? 0 : yield select(getCategoryVolume, payload)
    yield call(setCategorySoundsVolume, payload, volume)
  })
}

function * handleCategoryVolumeChange () {
  yield takeEvery(categoryRoutines.setVolume.TRIGGER, function * ({
    payload: category,
    meta: volume
  }) {
    if (yield select(getCategoryMutedStatus, category)) {
      yield put(categoryRoutines.unmute(category))
    }
    yield call(setCategorySoundsVolume, category, volume)
  })
}

export default [
  handleCategoryVolumeChange,
  handleCategoryMuteToggle
]
