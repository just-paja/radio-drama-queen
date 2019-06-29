import { boardRoutines } from '../actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { categoryRoutines } from '../../soundCategories'
import { ensureTargetCategory } from './categories'

function * handleSoundAdd () {
  yield takeEvery(boardRoutines.soundAdd.TRIGGER, function * ({ payload: { uuid, sound } }) {
    const target = yield call(ensureTargetCategory, uuid)
    yield put(categoryRoutines.soundAdd({ uuid: target.uuid, sound }))
  })
}

export default [
  handleSoundAdd
]
