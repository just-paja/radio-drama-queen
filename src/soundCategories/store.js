import { categoryRoutines } from './actions'
import { createEntityStore } from 'redux-entity-routines'
import { createSelector } from 'reselect'
import { toggle, turnOff } from 'react-saga-rest'
import { idCollection } from '../collections'

function updateParam (param) {
  return function (state, action) {
    if (state[param] !== action.payload[param]) {
      return {
        ...state,
        [param]: action.payload[param]
      }
    }
    return state
  }
}

export const categoryStore = createEntityStore('categories', {
  initialState: {
    board: null,
    name: '',
    path: '',
    volume: 50
  },
  providedBy: [
    categoryRoutines.create,
    categoryRoutines.rename,
    categoryRoutines.setVolume,
    categoryRoutines.soundAdd,
    categoryRoutines.soundRemove,
    categoryRoutines.toggleExclusive,
    categoryRoutines.toggleLoop,
    categoryRoutines.toggleMute,
    categoryRoutines.unmute
  ],
  deletedBy: [categoryRoutines.remove],
  on: {
    [categoryRoutines.setVolume.TRIGGER]: updateParam('volume'),
    [categoryRoutines.setVolume.REQUEST]: updateParam('volume'),
    [categoryRoutines.soundAdd.REQUEST]: idCollection.addPayload('sounds', 'sound'),
    [categoryRoutines.soundRemove.REQUEST]: idCollection.removePayload('sounds', 'sound'),
    [categoryRoutines.toggleExclusive.REQUEST]: toggle('exclusive'),
    [categoryRoutines.toggleMute.REQUEST]: toggle('muted'),
    [categoryRoutines.toggleLoop.REQUEST]: toggle('loop'),
    [categoryRoutines.rename.REQUEST]: updateParam('name'),
    [categoryRoutines.unmute.REQUEST]: turnOff('muted')
  }
})

export const getCategoryName = createSelector(
  categoryStore.getObject,
  category => category.name
)
