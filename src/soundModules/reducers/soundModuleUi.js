import { handleActions } from 'redux-actions'
import { turnOn, turnOff } from 'react-saga-rest'

import { libraryLoad } from '../actions'

const initialState = {
  showOpenLibraryDialog: false
}

const ui = handleActions({
  [libraryLoad.DIALOG_HIDE]: turnOff('showOpenLibraryDialog'),
  [libraryLoad.DIALOG_SHOW]: turnOn('showOpenLibraryDialog')
}, initialState)

export default ui
