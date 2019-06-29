import { all, put, select, takeEvery } from 'redux-saga/effects'
import { categoryList } from '../actions'
import { getCategorySoundUuids } from '../selectors'
import { soundList } from '../../sounds/actions'

function * handleCategoryRemove () {
  yield takeEvery(categoryList.REMOVE_STOP, function * ({ meta: { uuid } }) {
    const sounds = yield select(getCategorySoundUuids, uuid)
    yield put(categoryList.stop(uuid))
    yield put(categoryList.remove(uuid))
    yield all(sounds.map(soundUuid => put(soundList.unload(soundUuid))))
  })
}

export default [handleCategoryRemove]
