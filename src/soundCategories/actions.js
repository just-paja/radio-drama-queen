import { createEntityRoutines } from 'redux-entity-routines'

export const categoryRoutines = createEntityRoutines('CATEGORY', [
  'CREATE',
  'FOCUS',
  'REMOVE',
  'RENAME',
  'SET_VOLUME',
  'SOUND_ADD',
  'SOUND_DROP',
  'SOUND_REMOVE',
  'STOP',
  'TAG_ADD',
  'TOGGLE_EXCLUSIVE',
  'TOGGLE_LOOP',
  'TOGGLE_MUTE',
  'UNMUTE'
])
