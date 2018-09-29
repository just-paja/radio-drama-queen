import { handleActions } from 'redux-actions';
import { changeParam, replaceState } from 'react-saga-rest';

import { gallerySearch } from '../actions';

const initialState = {
  search: '',
  filterUsed: true,
};

const soundGallerySearch = handleActions({
  [gallerySearch.CHANGE]: changeParam('search', 'payload'),
  [gallerySearch.CLEAR]: replaceState(initialState),
  [gallerySearch.FILTER_USED_CHANGE]: changeParam('filterUsed', 'payload'),
}, initialState);

export default soundGallerySearch;
