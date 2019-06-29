import { boardRoutines } from './actions'
import { createEntityStore } from '../entities'

export const boardStore = createEntityStore('boards', {
  providedBy: [
    boardRoutines.create,
    boardRoutines.rename
  ],
  deletedBy: [boardRoutines.remove],
  on: {
    [boardRoutines.SOUND_ADD]: (state, action) => ({
      ...state,
      sounds: [...state.sounds, action.payload]
    })
  }
})
