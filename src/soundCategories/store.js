import { categoryRoutines } from './actions'
import { playbackRoutines } from '../playback/actions'
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

function update (state, action) {
  console.log(state, action)
  return { ...state, ...action.payload }
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
    [playbackRoutines.setExclusiveOff]: update,
    [playbackRoutines.setExclusiveOn]: update,
    [playbackRoutines.setLoopOff]: update,
    [playbackRoutines.setLoopOn]: update,
    [playbackRoutines.setVolume]: update,
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
    )
  }
})

export const getCategoryName = createSelector(
  categoryStore.getObject,
  category => category.name
)
