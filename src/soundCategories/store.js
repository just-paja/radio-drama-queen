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
    categoryRoutines.rename,
    categoryRoutines.setVolume,
    categoryRoutines.soundRemove
  ],
  deletedBy: [categoryRoutines.remove],
  on: {
    [playbackRoutines.setExclusiveOff.SUCCESS]: update,
    [playbackRoutines.setExclusiveOn.SUCCESS]: update,
    [playbackRoutines.setLoopOff.SUCCESS]: update,
    [playbackRoutines.setLoopOn.SUCCESS]: update,
    [playbackRoutines.setVolume.SUCCESS]: update,
    [playbackRoutines.setMuteOff.SUCCESS]: update,
    [playbackRoutines.setMuteOn.SUCCESS]: update,
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
