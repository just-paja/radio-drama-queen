import { createEntityRoutines } from 'redux-entity-routines'

export const playbackRoutines = createEntityRoutines('PLAYBACK', [
  'CATEGORY_PLAY',
  'CATEGORY_REMOVE',
  'CATEGORY_STOP',
  'SET_CATEGORY_UUID',
  'SET_LOOP_OFF',
  'SET_LOOP_ON',
  'SET_MUTE_OFF',
  'SET_MUTE_ON',
  'SET_VOLUME',
  'SOUND_ADD',
  'SOUND_PLAY',
  'SOUND_REMOVE',
  'SOUND_STOP'
])
