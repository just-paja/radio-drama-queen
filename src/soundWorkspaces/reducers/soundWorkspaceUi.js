import { handleActions } from 'redux-actions'

import { libraryWipe } from '../../soundModules/actions'
import { soundBoard } from '../../soundBoards/actions'
import { stories } from '../../soundStories/actions'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'
import { workspace, workspaceSave } from '../actions'

const initialState = {
  story: null,
  board: null,
  saveAsDialogOpen: false,
  view: VIEW_LIBRARY
}

const ui = handleActions({
  [stories.ADD]: (state, action) => {
    if (!state.story) {
      return {
        ...state,
        story: action.payload.name
      }
    }
    return state
  },
  [stories.SELECT]: (state, action) => ({
    ...state,
    story: action.meta ? action.meta.name : null
  }),
  [libraryWipe.TRIGGER]: state => ({
    ...state,
    board: null
  }),
  [soundBoard.REMOVE]: (state, action) => (
    action.payload === state.board
      ? { ...state, board: null }
      : state
  ),
  [workspace.SELECT_BOARD]: (state, action) => ({
    ...state,
    view: VIEW_BOARD,
    board: action.payload
  }),
  [workspace.SELECT_VIEW]: (state, action) => ({
    ...state,
    view: action.payload === null && state.board ? VIEW_BOARD : action.payload
  }),
  [workspaceSave.DIALOG_OPEN]: state => ({
    ...state,
    saveAsDialogOpen: true
  }),
  [workspaceSave.DIALOG_HIDE]: state => ({
    ...state,
    saveAsDialogOpen: false
  })
}, initialState)

export default ui
