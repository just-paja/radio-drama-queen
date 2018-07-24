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
  'SET_VOLUME',
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

export const library = createRoutine('LIBRARY', [
  'SAVE',
  'SAVE_AS',
  'SAVE_AS_CANCEL',
  'SAVE_AS_SUBMIT',
]);
