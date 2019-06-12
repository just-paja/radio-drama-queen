import { handleActions } from 'redux-actions'
import { replaceState } from 'react-saga-rest'

import { galleryTarget } from '../actions'

const initialState = {
  board: null,
  category: null
}

const soundGalleryTarget = handleActions({
  [galleryTarget.SET]: (state, action) => ({
    board: action.payload.board,
    category: action.payload.category
  }),
  [galleryTarget.CLEAR]: replaceState(initialState)
}, initialState)

export default soundGalleryTarget
