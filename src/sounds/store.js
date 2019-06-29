import { createEntityStore } from '../entities'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { soundRoutines } from './actions'

export const soundStore = createEntityStore('sounds', {
  initialState: {
    loading: false,
    loop: false,
    name: '',
    path: '',
    playing: false,
    tags: [],
    uuid: null,
    valid: false
  },
  providedBy: [soundRoutines.register],
  on: {
    [soundRoutines.play.TRIGGER]: turnOn('playing'),
    [soundRoutines.play.FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      playing: false
    }),
    [soundRoutines.play.FULFILL]: turnOff('playing'),
    [soundRoutines.stop.TRIGGER]: turnOff('playing'),
    [soundRoutines.loopOn.TRIGGER]: turnOn('loop'),
    [soundRoutines.loopOff.TRIGGER]: turnOff('loop'),
    [soundRoutines.unload.SUCCESS]: turnOff('valid'),
    [soundRoutines.load.REQUEST]: turnOn('loading'),
    [soundRoutines.load.SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
      valid: true
    }),
    [soundRoutines.load.FAILURE]: fetchFailure,
    [soundRoutines.load.FULFILL]: turnOff('loading')
  }
})
