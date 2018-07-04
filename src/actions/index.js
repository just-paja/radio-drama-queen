import { createRoutine, createListRoutine } from './routines';

export const categoryCreate = createRoutine('CATEGORY_CREATE', [
  'FORM_HIDE',
  'FORM_SHOW',
  'SUBMIT',
]);

export const categoryList = createListRoutine('CATEGORY', [
  'FILE_DROP',
  'LOOP_TOGGLE',
  'SOUND_ADD',
  'SOUND_REMOVE',
  'STOP',
]);

export const soundList = createListRoutine('SOUND', [
  'FINISHED',
  'LOAD_FAILURE',
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD',
  'PLAY_FAILURE',
  'PLAY',
  'SET_NAME',
  'STOP',
  'TOGGLE',
]);
