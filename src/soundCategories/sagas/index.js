import categoryCreate from './categoryCreate';
import categorySoundPlay from './categorySoundPlay';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import soundDrop from './soundDrop';

export * from './categoryCreate';

export default [
  ...categoryCreate,
  ...categorySoundPlay,
  ...categoryStop,
  ...categoryVolume,
  ...soundDrop,
];
