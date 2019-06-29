import { createEntityRoutines } from '../entities'

export const boardRoutines = createEntityRoutines('BOARD', [
  'CREATE',
  'CREATE_CATEGORY',
  'REMOVE',
  'RENAME',
  'SOUND_ADD',
  'SOUND_DROP',
  'TAG_ADD'
])
