import { combineReducers } from 'redux'

import browser from './browser'
import soundGallerySearch from './soundGallerySearch'
import soundGalleryTarget from './soundGalleryTarget'

export default combineReducers({
  browser,
  search: soundGallerySearch,
  target: soundGalleryTarget
})
