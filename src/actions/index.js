import { createRoutine } from './routines';

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
