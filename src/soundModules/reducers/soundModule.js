import { handleActions } from 'redux-actions'

import { soundModule as actions } from '../actions'

export const initialState = {
  name: null,
  url: null,
  loading: false
}

export default handleActions({
  [actions.LOAD_REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [actions.LOAD_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [actions.LOAD_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [actions.LOAD_FULFILL]: state => ({
    ...state,
    loading: false
  })
}, initialState)
