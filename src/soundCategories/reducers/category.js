import { compose } from 'redux'
import { handleActions } from 'redux-actions'
import { changeParam, toggle, turnOff, turnOn } from 'react-saga-rest'

import { idCollection } from '../../collections'
import { categoryList, categoryRename } from '../actions'

export const initialState = {
  edit: false,
  loop: false,
  muted: false,
  sounds: [],
  volume: 50
}

export default handleActions({
  [categoryList.EXCLUSIVE_TOGGLE]: toggle('exclusive'),
  [categoryList.LOOP_TOGGLE]: toggle('loop'),
  [categoryList.MUTE_TOGGLE]: toggle('muted'),
  [categoryList.SET_VOLUME]: changeParam('volume', 'payload'),
  [categoryList.SOUND_ADD]: idCollection.addPayload('sounds'),
  [categoryList.SOUND_REMOVE]: idCollection.removePayload('sounds'),
  [categoryList.UNMUTE]: turnOff('muted'),
  [categoryRename.SUBMIT]: compose(
    turnOff('edit'),
    changeParam('name', 'payload')
  ),
  [categoryRename.CLOSE]: turnOff('edit'),
  [categoryRename.OPEN]: turnOn('edit')
}, initialState)
