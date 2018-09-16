import createListReducer from '../../reducers/createListReducer';
import sound, { initialState } from './sound';

import { soundList } from '../actions';

export default createListReducer(soundList, sound, initialState);