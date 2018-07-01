import createListReducer from './createListReducer';
import sound from './sound';

import { soundList } from '../actions';

export default createListReducer(soundList, sound);
