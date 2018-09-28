import { handleActions } from 'redux-actions';
import { changeParam, toggle, turnOff } from 'react-saga-rest';

import { idCollection } from '../../collections';
import { categoryList } from '../actions';

export const initialState = {
  loop: false,
  muted: false,
  sounds: [],
  volume: 50,
};

export default handleActions({
  [categoryList.EXCLUSIVE_TOGGLE]: toggle('exclusive'),
  [categoryList.LOOP_TOGGLE]: toggle('loop'),
  [categoryList.MUTE_TOGGLE]: toggle('muted'),
  [categoryList.SET_VOLUME]: changeParam('volume', 'payload'),
  [categoryList.SOUND_ADD]: idCollection.addPayload('sounds'),
  [categoryList.SOUND_REMOVE]: idCollection.removePayload('sounds'),
  [categoryList.UNMUTE]: turnOff('muted'),
}, initialState);
