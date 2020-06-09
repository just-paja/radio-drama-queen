import { boardRoutines } from './actions'
import { createEntityStore } from 'redux-entity-store'

export const boardStore = createEntityStore({
  name: 'boards',
  identSource: 'uuid',
  providedBy: [boardRoutines.create, boardRoutines.rename],
  deletedBy: [boardRoutines.remove],
  on: {
    [boardRoutines.SOUND_ADD]: (state, action) => ({
      ...state,
      sounds: [...state.sounds, action.payload]
    })
  }
})
