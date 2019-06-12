import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'

import { categoryList } from '../actions'
import { soundList } from '../../sounds/actions'
import {
  getCategoryMutedStatus,
  getCategorySoundUuids,
  getCategoryVolume
} from '../selectors'

function * setCategorySoundsVolume (categoryUuid, volume) {
  const sounds = yield select(getCategorySoundUuids, categoryUuid)
  yield put(soundList.groupVolumeSet(null, { sounds, volume }))
}

function * setCategoryVolume ({ payload, meta: { uuid } }) {
  const muted = yield select(getCategoryMutedStatus, uuid)
  if (muted) {
    yield put(categoryList.unmute(uuid))
  }
  yield call(setCategorySoundsVolume, uuid, payload)
}

function * toggleMuteCategory ({ meta: { uuid } }) {
  const muted = yield select(getCategoryMutedStatus, uuid)
  const volume = muted ? 0 : yield select(getCategoryVolume, uuid)
  yield call(setCategorySoundsVolume, uuid, volume)
}

function * handleCategoryMuteToggle () {
  yield takeLatest(categoryList.MUTE_TOGGLE, toggleMuteCategory)
}

function * handleCategoryVolumeChange () {
  yield takeLatest(categoryList.SET_VOLUME, setCategoryVolume)
}

export default [
  handleCategoryVolumeChange,
  handleCategoryMuteToggle
]
