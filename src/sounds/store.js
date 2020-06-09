import { categoryRoutines } from '../soundCategories/actions'
import { createEntityStore } from 'redux-entity-store'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { soundRoutines } from './actions'
import { playbackRoutines } from '../playback/actions'

export const soundStore = createEntityStore({
  name: 'sounds',
  hasManyToMany: ['tags'],
  identSource: 'cachePath',
  initialState: {
    loading: false,
    loop: false,
    name: '',
    path: '',
    playing: false,
    tags: [],
    valid: false
  },
  providedBy: [
    playbackRoutines.soundPlay,
    playbackRoutines.soundProgress,
    playbackRoutines.soundStop,
    soundRoutines.edit,
    soundRoutines.register
  ],
  on: {
    [soundRoutines.play.TRIGGER]: turnOn('playing'),
    [soundRoutines.play.FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      playing: false
    }),
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
  collectionReducers: {
    [categoryRoutines.soundAdd.SUCCESS]: (state, action) => {
      const soundIndex = state.findIndex(
        item => item.cachePath === action.payload.sound
      )
      if (soundIndex !== -1) {
        const sound = state[soundIndex]
        const nextState = state.slice()
        nextState[soundIndex] = { ...sound, valid: true }
        return nextState
      }
      return state
    },
    [categoryRoutines.soundAdd.FULFILL]: (state, action) => {
      const soundIndex = state.findIndex(
        item => item.cachePath === action.payload.sound
      )
      if (soundIndex !== -1) {
        const sound = state[soundIndex]
        const nextState = state.slice()
        nextState[soundIndex] = { ...sound, loading: false }
        return nextState
      }
      return state
    },
    [categoryRoutines.soundAdd.REQUEST]: (state, action) => {
      const soundIndex = state.findIndex(
        item => item.cachePath === action.payload.sound
      )
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
