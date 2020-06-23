import { categoryRoutines } from '../soundCategories/actions'
import { createEntityStore } from 'redux-entity-store'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { soundRoutines } from './actions'
import { playbackRoutines } from '../playback/actions'
import { uiRoutines } from '../ui/actions'

function update (state, action) {
  return {
    ...state,
    ...action.payload
  }
}

export const soundStore = createEntityStore({
  name: 'sounds',
  hasManyToMany: ['tags'],
  identSource: 'cachePath',
  initialState: {
    duration: 0,
    loading: false,
    loop: false,
    name: '',
    path: '',
    playing: false,
    position: 0,
    tags: [],
    valid: false
  },
  providedBy: [soundRoutines.edit, soundRoutines.register],
  clearedBy: [uiRoutines.purge],
  on: {
    [playbackRoutines.soundEnd.SUCCESS]: update,
    [playbackRoutines.soundPlay.SUCCESS]: update,
    [playbackRoutines.soundProgress.SUCCESS]: update,
    [playbackRoutines.soundStop.SUCCESS]: update,
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
