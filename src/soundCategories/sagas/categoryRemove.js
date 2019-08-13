import { all, put, select, takeEvery } from 'redux-saga/effects'
import { CategoryRenameDialog } from '../components'
import { closeDialog } from '../../dialogs'
import { categoryRoutines } from '../actions'
import { getSoundCategories, getCategoryPlayingStatus, getCategorySoundUuids } from '../selectors'
import { reflectRoutine } from '../../sagas/reflect'
import { soundRoutines } from '../../sounds'

function * handleCategoryRemove () {
  yield takeEvery(categoryRoutines.remove.TRIGGER, function * ({ payload }) {
    const sounds = yield select(getCategorySoundUuids, payload)
    const playing = yield select(getCategoryPlayingStatus, payload)
    if (playing) {
      yield put(categoryRoutines.stop(payload))
    }
    yield all(sounds.map(soundUuid => put(soundRoutines.unload(soundUuid))))
    yield put(categoryRoutines.remove.success(payload))
  })
}

function * handleSoundRemove () {
  yield takeEvery(categoryRoutines.soundRemove.TRIGGER, function * ({ payload }) {
    const categories = yield select(getSoundCategories, payload.sound)
    if (categories.length === 0) {
      yield put(soundRoutines.unload(payload.sound))
    }
  })
}

export default [
  closeDialog(categoryRoutines.rename, CategoryRenameDialog),
  handleCategoryRemove,
  handleSoundRemove,
  reflectRoutine(categoryRoutines.rename)
]
