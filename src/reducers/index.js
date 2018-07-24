import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import categoryGrid from './categoryGrid';
import categoryList from './categoryList';
import libraryConfig from './libraryConfig';
import soundList from './soundList';
import ui from './ui';

export default combineReducers({
  categoryGrid,
  categoryList,
  form,
  libraryConfig,
  soundList,
  ui,
});
