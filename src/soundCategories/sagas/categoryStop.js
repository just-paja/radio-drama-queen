import { categoryList } from '../actions'
import { getCategorySoundPlayingUuids } from '../selectors'
import { put, select, takeEvery } from 'redux-saga/effects'
import { soundList } from '../../sounds/actions'

function * handleCategoryCreateStop () {
  yield takeEvery(categoryList.STOP, function * ({ meta: { uuid }, payload: noStop }) {
    const playingSounds = yield select(getCategorySoundPlayingUuids, uuid)
    const sounds = playingSounds.filter(sound => !noStop || sound !== noStop)
    yield put(soundList.groupStop(null, { sounds }))
  })
}

export default [handleCategoryCreateStop]
