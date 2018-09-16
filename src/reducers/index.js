import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import categoryGrid from './categoryGrid';
import categoryList from './categoryList';
import libraryConfig from './libraryConfig';
import notifications from './notifications';
import sounds from '../sounds/reducers';
import soundSearch from './soundSearch';
import tags from './tags';
import ui from './ui';

export default combineReducers({
  categoryGrid,
  categoryList,
  form,
  libraryConfig,
  notifications,
  sounds,
  soundSearch,
  tags,
  ui,
});
