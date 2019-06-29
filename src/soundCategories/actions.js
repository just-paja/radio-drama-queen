import { createEntityRoutines } from '../entities'

export const categoryRoutines = createEntityRoutines('CATEGORY', [
  'CREATE',
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
