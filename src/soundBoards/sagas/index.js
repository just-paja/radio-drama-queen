import soundAdd from './soundAdd';
import createBoardCategory from './createBoardCategory';

export * from './createBoard';
export * from './createDefaultCategory';

export default [
  ...soundAdd,
  ...createBoardCategory,
];
