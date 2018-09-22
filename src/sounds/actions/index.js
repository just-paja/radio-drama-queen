import { createListRoutine } from '../../lists';

export const soundList = createListRoutine('SOUND', [
  'FINISHED',
  'GROUP_STOP',
  'GROUP_VOLUME_SET',
  'LOAD_FAILURE',
  'LOAD_MANUAL',
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
  'VOLUME_SET',
]);

export default { soundList };
