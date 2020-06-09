import { categoryRoutines } from './actions'
import { createEntityStore } from 'redux-entity-store'
import { createSelector } from 'reselect'
import { idCollection } from '../collections'
import { turnOn, turnOff } from 'react-saga-rest'

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

export const categoryStore = createEntityStore({
  name: 'categories',
  identSource: 'uuid',
  initialState: {
    board: null,
    name: '',
    path: '',
    volume: 50
  },
  providedBy: [
    categoryRoutines.create,
    categoryRoutines.exclusiveOff,
    categoryRoutines.exclusiveOn,
    categoryRoutines.loopOff,
    categoryRoutines.loopOn,
    categoryRoutines.mute,
    categoryRoutines.rename,
    categoryRoutines.setVolume,
    categoryRoutines.soundRemove,
    categoryRoutines.unmute
  ],
  deletedBy: [categoryRoutines.remove],
  on: {
    [categoryRoutines.exclusiveOff.REQUEST]: turnOff('exclusive'),
    [categoryRoutines.exclusiveOn.REQUEST]: turnOn('exclusive'),
    [categoryRoutines.loopOff.REQUEST]: turnOff('loop'),
    [categoryRoutines.loopOn.REQUEST]: turnOn('loop'),
    [categoryRoutines.mute.REQUEST]: turnOn('muted'),
    [categoryRoutines.rename.REQUEST]: updateParam('name'),
    [categoryRoutines.setVolume.REQUEST]: updateParam('volume'),
    [categoryRoutines.setVolume.TRIGGER]: updateParam('volume'),
    [categoryRoutines.soundAdd.REQUEST]: idCollection.addPayload(
      'sounds',
      'sound'
    ),
    [categoryRoutines.soundRemove.REQUEST]: idCollection.removePayload(
      'sounds',
      'sound'
    ),
    [categoryRoutines.unmute.REQUEST]: turnOff('muted')
  }
})

export const getCategoryName = createSelector(
  categoryStore.getObject,
  category => category.name
)
