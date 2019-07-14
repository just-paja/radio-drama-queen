import { handleActions } from 'redux-actions'
import { boardRoutines } from '../../soundBoards'
import { storyRoutines } from '../../soundStories'
import { VIEW_BOARD, VIEW_STORIES } from '../constants'
import { workspaceRoutines } from '../actions'

const initialState = {
  story: null,
  board: null,
  view: VIEW_STORIES
}

function selectStory (state, action) {
  return { ...state, story: action.payload.uuid }
}

const ui = handleActions({
  [storyRoutines.load.SUCCESS]: selectStory,
  [workspaceRoutines.wipe.TRIGGER]: state => ({
    ...state,
    board: null
  }),
  [boardRoutines.remove.TRIGGER]: (state, action) => (
    action.payload === state.board
      ? { ...state, board: null }
      : state
  ),
  [workspaceRoutines.selectBoard.TRIGGER]: (state, action) => ({
    ...state,
    view: VIEW_BOARD,
    board: action.payload
  }),
  [workspaceRoutines.selectView.TRIGGER]: (state, action) => ({
    ...state,
    view: action.payload === null && state.board ? VIEW_BOARD : action.payload
  })
}, initialState)

export default ui
