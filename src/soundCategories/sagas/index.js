import categoryCreate from './categoryCreate';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import soundDrop from './soundDrop';

export * from './categoryCreate';

export default [
  ...categoryCreate,
  ...categoryStop,
  ...categoryVolume,
  ...soundDrop,
];
