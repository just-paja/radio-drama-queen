import { combineReducers } from 'redux';

import config from './config';
import soundModuleList from './soundModuleList';
import soundModuleUi from './soundModuleUi';

export default combineReducers({
  config,
  list: soundModuleList,
  ui: soundModuleUi,
});
