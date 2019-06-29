import { call, put, select, takeEvery } from 'redux-saga/effects'
import { categoryList } from '../actions'
import { getCategoryMutedStatus, getCategorySoundUuids, getCategoryVolume } from '../selectors'
import { soundList } from '../../sounds/actions'

function * setCategorySoundsVolume (categoryUuid, volume) {
  const sounds = yield select(getCategorySoundUuids, categoryUuid)
  yield put(soundList.groupVolumeSet(null, { sounds, volume }))
}

function * handleCategoryMuteToggle () {
  yield takeEvery(categoryList.MUTE_TOGGLE, function * ({ meta: { uuid } }) {
    const muted = yield select(getCategoryMutedStatus, uuid)
    const volume = muted ? 0 : yield select(getCategoryVolume, uuid)
    yield call(setCategorySoundsVolume, uuid, volume)
  })
}

function * handleCategoryVolumeChange () {
  yield takeEvery(categoryList.SET_VOLUME, function * ({ payload, meta: { uuid } }) {
    const muted = yield select(getCategoryMutedStatus, uuid)
    if (muted) {
      yield put(categoryList.unmute(uuid))
    }
    yield call(setCategorySoundsVolume, uuid, payload)
  })
}

export default [
  handleCategoryVolumeChange,
  handleCategoryMuteToggle
]
