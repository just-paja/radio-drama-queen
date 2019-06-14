import { handleActions } from 'redux-actions'

import { libraryWipe } from '../../soundModules/actions'
import { workspace, workspaceSave } from '../actions'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'

const initialState = {
  board: null,
  saveAsDialogOpen: false,
  view: VIEW_LIBRARY
}

const ui = handleActions({
  [libraryWipe.TRIGGER]: state => ({
    ...state,
    board: null
  }),
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
