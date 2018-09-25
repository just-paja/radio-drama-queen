import { handleActions } from 'redux-actions';
import { changeParam, replaceState } from 'react-saga-rest';

import { gallerySearch } from '../actions';

const initialState = {
  search: '',
};

const soundGallerySearch = handleActions({
  [gallerySearch.CHANGE]: changeParam('search', 'payload'),
  [gallerySearch.CLEAR]: replaceState(initialState),
}, initialState);

export default soundGallerySearch;
