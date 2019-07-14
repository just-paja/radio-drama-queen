import addSoundToGrid from './addSoundToGrid'
import addTagToBoard from './addTagToBoard'
import openEmptyStory from './openEmptyStory'
import showBoardOnCreate from './showBoardOnCreate'
import soundPicker from './soundPicker'

export default [
  ...addSoundToGrid,
  ...addTagToBoard,
  ...openEmptyStory,
  ...showBoardOnCreate,
  ...soundPicker
]
