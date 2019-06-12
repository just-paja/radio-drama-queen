import { handleActions } from 'redux-actions'

import { workspaceLoad, workspaceSave } from '../actions'

const initialState = {
  error: null,
  loading: false,
  path: null,
  saveAsDialogOpen: false
}

const ui = handleActions({
  [workspaceSave.REQUEST]: state => ({
    ...state,
    error: null,
    loading: true
  }),
  [workspaceSave.FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [workspaceSave.FULFILL]: state => ({
    ...state,
    loading: true
  }),
  [workspaceSave.DESTINATION_CHANGE]: (state, action) => ({
    ...state,
    path: action.payload
  }),
  [workspaceLoad.DESTINATION_CHANGE]: (state, action) => ({
    ...state,
    path: action.payload
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
