import { createListRoutine } from '../lists/routines'

export const stories = createListRoutine('STORY_LIST', [
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SELECT',
  'SUCCESS',
  'TRIGGER'
])
export const storyCreate = createListRoutine('STORY_CREATE', [
  'CLOSE',
  'OPEN',
  'SUBMIT'
])
