import { all, put, select, takeEvery } from 'redux-saga/effects'
import { CategoryRenameDialog } from '../components'
import { categoryRoutines } from '../actions'
import { closeDialog } from '../../dialogs'
import { getSoundCategories, getCategoryPlayingStatus, getCategorySoundUuids } from '../selectors'
import { passRequest } from '../../ipcActionPipe'
import { soundRoutines } from '../../sounds'

function * handleCategoryRemove () {
  yield takeEvery(categoryRoutines.remove.TRIGGER, function * ({ payload }) {
    const sounds = yield select(getCategorySoundUuids, payload)
    const playing = yield select(getCategoryPlayingStatus, payload)
    if (playing) {
      yield put(categoryRoutines.stop(payload))
    }
    yield all(sounds.map(soundUuid => put(soundRoutines.unload(soundUuid))))
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
  passRequest(categoryRoutines.create),
  passRequest(categoryRoutines.remove),
  passRequest(categoryRoutines.rename),
  passRequest(categoryRoutines.setVolume),
  passRequest(categoryRoutines.soundAdd),
  passRequest(categoryRoutines.soundRemove),
  passRequest(categoryRoutines.toggleExclusive),
  passRequest(categoryRoutines.toggleLoop),
  passRequest(categoryRoutines.toggleMute),
  passRequest(categoryRoutines.unmute)
]
