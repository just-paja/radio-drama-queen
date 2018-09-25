import { combineReducers } from 'redux';

import soundGallerySearch from './soundGallerySearch';

export default combineReducers({
  search: soundGallerySearch,
});
