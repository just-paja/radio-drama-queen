import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { createEntityStore } from 'redux-entity-routines'
import { libraryRoutines } from './actions'

export const libraryStore = createEntityStore('libraries', {
  identAttr: 'url',
  initialState: {
    directory: null,
    loading: false,
    name: null,
    url: null
  },
  providedBy: [libraryRoutines.load],
  on: {
    [libraryRoutines.load.FAILURE]: fetchFailure,
    [libraryRoutines.load.FULFILL]: turnOff('loading'),
    [libraryRoutines.load.REQUEST]: turnOn('loading')
  }
})
