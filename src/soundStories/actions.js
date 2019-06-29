import { createEntityRoutines } from '../entities/actions'

export const storyRoutines = createEntityRoutines('STORY', [
  'CREATE',
  'LIST',
  'LOAD',
  'SAVE'
])
