import { combineReducers } from 'redux'

import soundGallerySearch from './soundGallerySearch'
import soundGalleryTarget from './soundGalleryTarget'

export default combineReducers({
  search: soundGallerySearch,
  target: soundGalleryTarget
})
