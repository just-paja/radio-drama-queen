import { handleActions } from 'redux-actions'

import { libraryLoad } from '../actions'

const initialState = {
  rootModule: null,
  url: null
}

export default handleActions({
  [libraryLoad.SUCCESS]: (state, { payload: { rootModule, url } }) => ({
    ...state,
    rootModule,
    url
  })
}, initialState)
