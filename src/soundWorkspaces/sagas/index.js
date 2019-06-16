import addSoundToGrid from './addSoundToGrid'
import addTagToBoard from './addTagToBoard'
import showBoardOnCreate from './showBoardOnCreate'
import soundPicker from './soundPicker'
import workspaceLoad from './workspaceLoad'

export default [
  ...addSoundToGrid,
  ...addTagToBoard,
  ...showBoardOnCreate,
  ...soundPicker,
  ...workspaceLoad
]
