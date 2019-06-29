import { createEntityStore } from '../entities'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { moduleRoutines } from './actions'

export const moduleStore = createEntityStore('modules', {
  identAttr: 'name',
  initialState: {
    loading: false,
    name: null,
    url: null
  },
  providedBy: [moduleRoutines.load, moduleRoutines.register],
  on: {
    [moduleRoutines.load.FAILURE]: fetchFailure,
    [moduleRoutines.load.FULFILL]: turnOff('loading'),
    [moduleRoutines.load.REQUEST]: turnOn('loading')
  }
})
