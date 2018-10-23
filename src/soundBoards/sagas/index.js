import boardCategoryCreate from './boardCategoryCreate';
import boardCreate from './boardCreate';
import boardRename from './boardRename';
import boardSoundAdd from './boardSoundAdd';
import boardSoundDrop from './boardSoundDrop';
import boardTagAdd from './boardTagAdd';

export * from './boardCategoryCreateDefault';
export * from './boardCreate';

export default [
  ...boardCategoryCreate,
  ...boardCreate,
  ...boardRename,
  ...boardSoundAdd,
  ...boardSoundDrop,
  ...boardTagAdd,
];
