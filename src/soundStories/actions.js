import { createListRoutine } from '../lists/routines'

export const stories = createListRoutine('STORY_LIST', [
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SUCCESS',
  'TRIGGER'
])
