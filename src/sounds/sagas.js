import { closeDialog } from '../dialogs'
import { passRequest } from '../ipcActionPipe'
import { select, put, takeEvery } from 'redux-saga/effects'
import { SoundEditDialog } from './components'
import { soundRoutines } from './actions'
import { soundStore } from './store'

export function * handleSoundToggle () {
  yield takeEvery(soundRoutines.toggle.TRIGGER, function * ({ payload }) {
    const playing = yield select(soundStore.getFlag, payload, 'playing')
    if (playing) {
      yield put(soundRoutines.stop(payload))
    } else {
      yield put(soundRoutines.play(payload))
    }
  })
}

export default [
  closeDialog(soundRoutines.edit, SoundEditDialog),
  passRequest(soundRoutines.edit),
  passRequest(soundRoutines.play),
  passRequest(soundRoutines.stop),
  passRequest(soundRoutines.stopAll),
  handleSoundToggle
]
