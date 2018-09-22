import sound, { initialState } from './sound';

import { createListReducer } from '../../lists';
import { soundList } from '../actions';

export default createListReducer(soundList, sound, initialState);
