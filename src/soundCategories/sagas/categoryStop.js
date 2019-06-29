import { categoryRoutines } from '../actions'
import { getCategorySoundPlayingUuids } from '../selectors'
import { put, select, takeEvery } from 'redux-saga/effects'
import { soundRoutines } from '../../sounds'

function * handleCategoryCreateStop () {
  yield takeEvery(categoryRoutines.stop.TRIGGER, function * ({ payload, meta: noStop }) {
    const playingSounds = yield select(getCategorySoundPlayingUuids, payload)
    if (playingSounds.length) {
      yield put(soundRoutines.stop(playingSounds.filter(sound => !noStop || sound !== noStop)))
    }
  })
}

export default [handleCategoryCreateStop]
