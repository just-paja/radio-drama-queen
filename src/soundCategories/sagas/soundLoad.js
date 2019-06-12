import { put, takeLatest } from '@redux-saga/core/effects'

import { categoryList } from '../actions'
import { soundLoad } from '../../sounds/actions'

function * loadSound ({ payload }) {
  yield put(soundLoad.trigger(payload))
}

function * handleSoundAdd () {
  yield takeLatest(categoryList.SOUND_ADD, loadSound)
}

export default [
  handleSoundAdd
]
