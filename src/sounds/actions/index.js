import { createListRoutine } from '../../actions/routines';

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

export default { soundList };
