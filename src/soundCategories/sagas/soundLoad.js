import { categoryList } from '../actions'
import { put, takeEvery } from '@redux-saga/core/effects'
import { soundLoad } from '../../sounds/actions'

function * handleSoundAdd () {
  yield takeEvery(categoryList.SOUND_ADD, function * ({ payload }) {
    yield put(soundLoad.trigger(payload))
  })
}

export default [handleSoundAdd]
