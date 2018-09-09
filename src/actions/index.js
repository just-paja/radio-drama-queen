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

export const tagList = createListRoutine('TAG', [
  'CREATE',
]);

export const ui = createRoutine('UI', [
  'EDIT_MODE_TOGGLE',
]);

export const soundList = createListRoutine('SOUND', [
  'LOAD_MANUAL',
  'FINISHED',
  'LOAD_FAILURE',
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD',
  'PLAY_FAILURE',
  'PLAY',
  'SET_NAME',
  'SET_TAGS',
  'STOP',
  'TAG_ADD',
  'TAG_REMOVE',
  'TOGGLE',
]);

export const library = createRoutine('LIBRARY', [
  'MODULE_DOWNLOAD_FAILURE',
  'MODULE_DOWNLOAD_REQUEST',
  'MODULE_DOWNLOAD_SUCCESS',
  'OPEN_DIALOG_HIDE',
  'OPEN_DIALOG_SHOW',
  'OPEN_DIALOG_SUBMIT',
  'SAVE_AS_CANCEL',
  'SAVE_AS_HIDE',
  'SAVE_AS_SUBMIT',
  'SAVE_AS',
  'SAVE',
  'SET_CONFIG',
]);

export const notify = createRoutine('NOTIFY', [
  'ADD',
  'HIDE',
  'REMOVE',
  'TRIGGER',
]);
