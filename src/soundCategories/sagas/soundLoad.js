import { categoryRoutines } from '../actions'
import { getSoundCategories } from '../selectors'
import { call, put, select, takeEvery } from '@redux-saga/core/effects'
import { soundRoutines, soundStore } from '../../sounds'
import { categoryStore } from '../store'

function * handleSoundAdd () {
  yield takeEvery(categoryRoutines.soundAdd.TRIGGER, function * ({ payload: { uuid, sound } }) {
    const soundObj = yield select(soundStore.getObject, sound)
    if (soundObj.valid) {
      yield call(useCategorySettings, uuid, sound)
    } else {
      yield put(soundRoutines.load(sound))
    }
  })
}

function * useCategorySettings (categoryUuid, soundUuid) {
  const category = yield select(categoryStore.getObject, categoryUuid)
  if (category) {
    const sound = yield select(soundStore.getObject, soundUuid)
    if (sound.loop !== category.loop) {
      const loopRoutine = category.loop ? soundRoutines.loopOn : soundRoutines.loopOff
      yield put(loopRoutine(soundUuid))
    }
    if (sound.volume !== category.volume) {
      yield put(soundRoutines.setVolume(soundUuid, {
        volume: category.volume
      }))
    }
  }
}

function * normalizeSoundSettingsOnLoad () {
  yield takeEvery(soundRoutines.load.SUCCESS, function * ({ payload }) {
    const categories = yield select(getSoundCategories, payload.uuid)
    const category = categories[0]
    if (category) {
      yield call(useCategorySettings, category.uuid, payload.uuid)
    }
  })
}

export default [
  handleSoundAdd,
  normalizeSoundSettingsOnLoad
]
