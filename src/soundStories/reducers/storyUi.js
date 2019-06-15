import { handleActions } from 'redux-actions'
import { turnOff, turnOn } from 'react-saga-rest'

import { storyCreate } from '../actions'

const initialState = {
  showStoryCreateDialog: false,
}

export const storyUi = handleActions({
  [storyCreate.CLOSE]: turnOff('showStoryCreateDialog'),
  [storyCreate.OPEN]: turnOn('showStoryCreateDialog')
}, initialState)
