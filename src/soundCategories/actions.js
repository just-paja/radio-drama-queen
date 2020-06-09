import { createEntityRoutines } from 'redux-entity-store'

export const categoryRoutines = createEntityRoutines('CATEGORY', [
  'CREATE',
  'EXCLUSIVE_OFF',
  'EXCLUSIVE_ON',
  'FOCUS',
  'LOOP_OFF',
  'LOOP_ON',
  'MUTE',
  'REMOVE',
  'RENAME',
  'SET_VOLUME',
  'SOUND_ADD',
  'SOUND_DROP',
  'SOUND_REMOVE',
  'STOP',
  'TAG_ADD',
  'UNMUTE'
])
