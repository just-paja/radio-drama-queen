import sound, { initialState } from './sound'

import { createListReducer } from '../../lists'
import { soundList, soundLoad, soundRegister } from '../actions'

const reducers = {
  [soundRegister.SUCCESS]: (state, action) => state.map(
    sound => sound.uuid === action.payload.uuid
      ? action.payload
      : sound
  )
}

export default createListReducer([
  soundList,
  soundLoad
], sound, initialState, reducers)
