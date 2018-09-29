import { createSelector } from 'reselect';

import { getBoards } from '../../soundBoards/selectors';
import { getCategories } from '../../soundCategories/selectors';
import { memoizeSoundList } from '../../sounds/selectors';

const memoizeUi = state => state.soundWorkspaces.ui;

export const getActiveBoardUuid = createSelector(
  memoizeUi,
  config => config.board
);

export const getActiveBoard = createSelector(
  [getBoards, getActiveBoardUuid],
  (boards, activeBoardUuid) => boards.find(board => board.uuid === activeBoardUuid)
);

export const getLastUsedBoard = createSelector(
  [getBoards],
  boards => boards[0]
);

export const getDefaultTargetBoard = createSelector(
  [getActiveBoard, getLastUsedBoard],
  (activeBoard, lastUsedBoard) => activeBoard || lastUsedBoard
);

export const getWorkspaceView = createSelector(
  memoizeUi,
  config => config.view
);

export const countBoardSounds = createSelector(
  [memoizeSoundList, getCategories],
  (sounds, categories) => sounds.filter(
    sound => categories.some(
      category => category.sounds.indexOf(sound.uuid) !== -1
    )
  ).length
);

export const countMemorySounds = createSelector(
  [memoizeSoundList],
  sounds => sounds.filter(sound => sound.valid).length
);

export const countErrorSounds = createSelector(
  [memoizeSoundList],
  sounds => sounds.filter(sound => sound.error).length
);
