import { browseRoutines } from '../actions'
import { handleActions } from 'redux-actions'

const initialState = {
  libraryUrl: null,
  moduleUrl: null
}

const soundGallerySearch = handleActions({
  [browseRoutines.SELECT_LIBRARY]: (state, action) => ({
    libraryUrl: action.payload,
    moduleUrl: null
  }),
  [browseRoutines.SELECT_MODULE]: (state, action) => action.payload
}, initialState)

export default soundGallerySearch
