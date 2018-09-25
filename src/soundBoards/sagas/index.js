import boardCategoryCreate from './boardCategoryCreate';
import boardCreate from './boardCreate';
import boardSoundAdd from './boardSoundAdd';

export * from './boardCategoryCreateDefault';
export * from './boardCreate';

export default [
  ...boardSoundAdd,
  ...boardCreate,
  ...boardCategoryCreate,
];
