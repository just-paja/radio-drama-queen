import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import categoryGrid from './categoryGrid';
import categoryList from './categoryList';
import soundList from './soundList';

export default combineReducers({
  categoryGrid,
  categoryList,
  form,
  soundList,
});
