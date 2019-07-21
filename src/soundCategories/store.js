import { categoryRoutines } from './actions'
import { createEntityStore } from 'redux-entity-routines'
import { createSelector } from 'reselect'
import { changeParam, toggle, turnOff } from 'react-saga-rest'
import { idCollection } from '../collections'

export const categoryStore = createEntityStore('categories', {
  initialState: {
    board: null,
    name: '',
    path: '',
    volume: 50
  },
  providedBy: [categoryRoutines.create, categoryRoutines.rename],
  deletedBy: [categoryRoutines.remove],
  on: {
    [categoryRoutines.setVolume.TRIGGER]: changeParam('volume', 'meta'),
    [categoryRoutines.soundAdd.TRIGGER]: idCollection.addPayload('sounds', 'sound'),
    [categoryRoutines.soundRemove.TRIGGER]: idCollection.removePayload('sounds', 'sound'),
    [categoryRoutines.toggleExclusive.TRIGGER]: toggle('exclusive'),
    [categoryRoutines.toggleMute.TRIGGER]: toggle('muted'),
    [categoryRoutines.toggleLoop.SUCCESS]: toggle('loop'),
    [categoryRoutines.unmute.TRIGGER]: turnOff('muted')
  }
})

export const getCategoryName = createSelector(
  categoryStore.getObject,
  category => category.name
)
