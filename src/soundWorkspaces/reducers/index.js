import { combineReducers } from 'redux'

import soundWorkspaceLoad from './soundWorkspaceLoad'
import soundWorkspaceSave from './soundWorkspaceSave'
import soundWorkspaceUi from './soundWorkspaceUi'

export default combineReducers({
  load: soundWorkspaceLoad,
  save: soundWorkspaceSave,
  ui: soundWorkspaceUi
})
