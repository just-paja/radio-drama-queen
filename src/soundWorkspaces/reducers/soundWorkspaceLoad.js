import { handleActions } from 'redux-actions'

import { workspaceLoad } from '../actions'

const initialState = {
  error: null,
  loading: false,
  loadFromDialogOpen: false
}

const ui = handleActions({
  [workspaceLoad.REQUEST]: state => ({
    ...state,
    error: null,
    loading: true
  }),
  [workspaceLoad.FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [workspaceLoad.FULFILL]: state => ({
    ...state,
    loading: true
  }),
  [workspaceLoad.DIALOG_OPEN]: state => ({
    ...state,
    loadFromDialogOpen: true
  }),
  [workspaceLoad.DIALOG_HIDE]: state => ({
    ...state,
    loadFromDialogOpen: false
  })
}, initialState)

export default ui
