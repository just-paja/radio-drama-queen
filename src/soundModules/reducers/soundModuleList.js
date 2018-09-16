import createListReducer from '../../reducers/createListReducer';
import soundModule, { initialState } from './soundModule';

import { soundModule as soundModuleActions } from '../actions';

export default createListReducer(
  soundModuleActions,
  soundModule,
  initialState
);
