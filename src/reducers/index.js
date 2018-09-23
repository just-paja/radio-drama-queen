import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import soundCategories from '../soundCategories/reducers';
import soundModules from '../soundModules/reducers';
import sounds from '../sounds/reducers';
import soundSearch from './soundSearch';
import soundWorkspaces from '../soundWorkspaces/reducers';
import tags from '../tags/reducers';

export default combineReducers({
  soundCategories,
  form,
  soundModules,
  sounds,
  soundSearch,
  soundWorkspaces,
  tags,
});
