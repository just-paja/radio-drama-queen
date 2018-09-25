import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import soundBoards from '../soundBoards/reducers';
import soundCategories from '../soundCategories/reducers';
import soundGallery from '../soundGallery/reducers';
import soundModules from '../soundModules/reducers';
import sounds from '../sounds/reducers';
import soundWorkspaces from '../soundWorkspaces/reducers';
import tags from '../tags/reducers';

export default combineReducers({
  form,
  soundBoards,
  soundCategories,
  soundGallery,
  soundModules,
  sounds,
  soundWorkspaces,
  tags,
});
