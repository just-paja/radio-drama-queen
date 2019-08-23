import addSoundToGrid from './addSoundToGrid'
import addTagToBoard from './addTagToBoard'
import boardFocus from './boardFocus'
import openEmptyStory from './openEmptyStory'
import showBoardOnCreate from './showBoardOnCreate'
import soundPicker from './soundPicker'
import workspaceState from './workspaceState'

export default [
  ...addSoundToGrid,
  ...addTagToBoard,
  ...boardFocus,
  ...openEmptyStory,
  ...showBoardOnCreate,
  ...soundPicker,
  ...workspaceState
]
