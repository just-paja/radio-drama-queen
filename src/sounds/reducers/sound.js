import { handleActions } from 'redux-actions';
import {
  fetchFailure,
  changeParam,
  turnOff,
  turnOn,
} from 'react-saga-rest';

import { soundList } from '../actions';
import { idCollection } from '../../collections';

export const initialState = {
  loading: false,
  loop: false,
  name: '',
  path: '',
  playing: false,
  tags: [],
  uuid: null,
  valid: false,
};

export default handleActions({
  [soundList.PLAY]: turnOn('playing'),
  [soundList.PLAY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    playing: false,
  }),
  [soundList.FINISHED]: turnOff('playing'),
  [soundList.STOP]: turnOff('playing'),
  [soundList.LOAD_REQUEST]: turnOn('loading'),
  [soundList.LOAD_SUCCESS]: turnOn('valid'),
  [soundList.LOAD_FAILURE]: fetchFailure,
  [soundList.LOAD_FULFILL]: turnOff('loading'),
  [soundList.LOOP_ON]: turnOn('loop'),
  [soundList.LOOP_OFF]: turnOff('loop'),
  [soundList.SET_NAME]: changeParam('name', 'payload'),
  [soundList.SET_TAGS]: changeParam('tags', 'payload'),
  [soundList.TAG_ADD]: idCollection.addPayload('tags'),
  [soundList.TAG_REMOVE]: idCollection.removePayload('tags'),
  [soundList.UNLOAD]: turnOff('valid'),
}, initialState);
