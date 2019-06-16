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
  'CLOSE',
  'FAILURE',
  'FULFILL',
  'OPEN',
  'REQUEST',
  'SUBMIT',
  'SUCCESS'
], 'name')

export const storyLoad = createListRoutine('STORY_LOAD', [
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SUCCESS',
  'TRIGGER'
], 'name')

export const storySave = createListRoutine('STORY_SAVE', [
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SUCCESS',
  'TRIGGER'
], 'name')
