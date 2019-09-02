import { categoryRoutines } from '../soundCategories/actions'
import { createEntityStore } from 'redux-entity-routines'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { soundRoutines } from './actions'

export const soundStore = createEntityStore('sounds', {
  hasManyToMany: ['tags'],
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
  providedBy: [soundRoutines.register, soundRoutines.edit],
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
  },
  collectionRoutines: {
    [categoryRoutines.soundAdd.SUCCESS]: (state, action) => {
      const soundIndex = state.find(item => item.cachePath === action.payload.cachePath)
      if (soundIndex !== -1) {
        const sound = state[soundIndex]
        const nextState = state.slice()
        nextState[soundIndex] = { ...sound, valid: true }
        return nextState
      }
      return state
    },
    [categoryRoutines.soundAdd.FULFILL]: (state, action) => {
      const soundIndex = state.find(item => item.cachePath === action.payload.uuid)
      if (soundIndex !== -1) {
        const sound = state[soundIndex]
        const nextState = state.slice()
        nextState[soundIndex] = { ...sound, loading: false }
        return nextState
      }
      return state
    },
    [categoryRoutines.soundAdd.REQUEST]: (state, action) => {
      const soundIndex = state.find(item => item.uuid === action.payload.sound)
      if (soundIndex !== -1) {
        const sound = state[soundIndex]
        const nextState = state.slice()
        nextState[soundIndex] = { ...sound, loading: true }
        return nextState
      }
      return state
    }
  }
})
