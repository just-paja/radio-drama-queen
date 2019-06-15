import { createListRoutine } from '../lists/routines'

export const stories = createListRoutine('STORY_LIST', [
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SELECT',
  'SUCCESS',
  'TRIGGER'
], 'name')

export const storyCreate = createListRoutine('STORY_CREATE', [
  'REQUEST',
  'SUCCESS',
  'FULFILL',
  'CLOSE',
  'OPEN',
  'SUBMIT'
], 'name')
