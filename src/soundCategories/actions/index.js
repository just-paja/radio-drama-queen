import { createRoutine, createListRoutine } from '../../actions/routines';

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
