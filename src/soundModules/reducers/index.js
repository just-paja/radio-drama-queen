import { combineReducers } from 'redux';

import config from './config';
import soundModuleList from './soundModuleList';

export default combineReducers({
  config,
  list: soundModuleList,
});
