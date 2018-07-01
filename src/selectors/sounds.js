import { createSelector } from 'reselect';

export const getSound = createSelector(
  (state, uuid) => state.soundList.find(sound => sound.uuid === uuid),
  item => item
);

export default { getSound };
