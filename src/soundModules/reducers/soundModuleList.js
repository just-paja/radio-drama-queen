import soundModule, { initialState } from './soundModule';

import { createListReducer } from '../../lists/createListReducer';
import { soundModule as soundModuleActions } from '../actions';

export default createListReducer(
  soundModuleActions,
  soundModule,
  initialState
);
