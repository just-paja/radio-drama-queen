import { createRoutine, createListRoutine } from './routines';

export const categoryCreate = createRoutine('CATEGORY_CREATE', [
  'FORM_HIDE',
  'FORM_SHOW',
  'SUBMIT',
  'TRIGGER',
]);

export const categoryList = createListRoutine('CATEGORY', [
  'EXCLUSIVE_TOGGLE',
  'FILE_DROP',
  'LOOP_TOGGLE',
  'MUTE_TOGGLE',
  'SET_VOLUME',
  'SOUND_ADD',
  'SOUND_REMOVE',
  'STOP',
  'UNMUTE',
]);

export const ui = createRoutine('UI', [
  'EDIT_MODE_TOGGLE',
]);

export const soundSearch = createRoutine('SOUND_SEARCH', [
  'CHANGE',
  'CLEAR',
]);

export const notify = createRoutine('NOTIFY', [
  'ADD',
  'HIDE',
  'REMOVE',
  'TRIGGER',
]);
