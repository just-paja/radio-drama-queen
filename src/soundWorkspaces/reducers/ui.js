import { boardRoutines } from '../../soundBoards'
import { categoryRoutines } from '../../soundCategories'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { soundRoutines } from '../../sounds'
import { storyRoutines } from '../../soundStories'
import { VIEW_BOARD, VIEW_STORIES } from '../constants'
import { workspaceRoutines } from '../actions'

const board = handleActions({
  [workspaceRoutines.wipe.TRIGGER]: () => null,
  [boardRoutines.remove.TRIGGER]: (state, action) => action.payload === state ? null : state,
  [workspaceRoutines.selectBoard.TRIGGER]: (state, action) => action.payload
}, null)

const category = handleActions({
  [categoryRoutines.create.SUCCESS]: (state, action) => action.payload.uuid,
  [categoryRoutines.focus.TRIGGER]: (state, action) => action.payload,
  [categoryRoutines.remove.TRIGGER]: (state, action) => state === action.payload ? null : state
}, null)

const sound = handleActions({
  [categoryRoutines.focus.TRIGGER]: (state, action) => null,
  [soundRoutines.focus.TRIGGER]: (state, action) => action.payload,
  [categoryRoutines.soundRemove.TRIGGER]: (state, action) => state === action.payload.sound ? null : state,
  [soundRoutines.unload.TRIGGER]: (state, action) => state === action.payload ? null : state
}, null)

const story = handleActions({
  [storyRoutines.load.SUCCESS]: (state, action) => action.payload.uuid
}, null)

const view = handleActions({
  [workspaceRoutines.selectBoard.TRIGGER]: () => VIEW_BOARD,
  [workspaceRoutines.selectView.TRIGGER]: (state, action) => action.payload || state
}, VIEW_STORIES)

export default combineReducers({
  board,
  category,
  sound,
  story,
  view
})
