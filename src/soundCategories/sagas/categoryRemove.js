import { all, put, select, takeEvery } from 'redux-saga/effects'
import { CategoryRenameDialog } from '../components'
import { closeDialog } from '../../dialogs'
import { categoryRoutines } from '../actions'
import { getCategoryPlayingStatus, getCategorySoundUuids } from '../selectors'
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

export default [
  closeDialog(categoryRoutines.rename, CategoryRenameDialog),
  handleCategoryRemove,
  reflectRoutine(categoryRoutines.rename)
]
