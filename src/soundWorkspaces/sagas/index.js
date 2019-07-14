import addSoundToGrid from './addSoundToGrid'
import addTagToBoard from './addTagToBoard'
import openNewStory from './openNewStory'
import showBoardOnCreate from './showBoardOnCreate'
import soundPicker from './soundPicker'

export default [
  ...addSoundToGrid,
  ...addTagToBoard,
  ...openNewStory,
  ...showBoardOnCreate,
  ...soundPicker
]
