import { createRoutine } from '../../actions/routines';
import { createListRoutine } from '../../lists';

export const categoryCreate = createRoutine('CATEGORY_CREATE', [
  'FORM_HIDE',
  'FORM_SHOW',
  'SUBMIT',
  'TRIGGER',
]);

export const categoryRename = createListRoutine('CATEGORY_RENAME', [
  'CLOSE',
  'OPEN',
  'SUBMIT',
]);

export const categoryList = createListRoutine('CATEGORY', [
  'EXCLUSIVE_TOGGLE',
  'FILE_DROP',
  'LOOP_TOGGLE',
  'MUTE_TOGGLE',
  'REMOVE_STOP',
  'SET_VOLUME',
  'SOUND_ADD',
  'SOUND_DROP',
  'SOUND_REMOVE',
  'STOP',
  'TAG_ADD',
  'UNMUTE',
]);
