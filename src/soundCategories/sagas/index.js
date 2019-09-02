import categoryManipulation from './categoryManipulation'
import categorySoundPlay from './categorySoundPlay'
import categoryStop from './categoryStop'
import categoryTagAdd from './categoryTagAdd'
import categoryVolume from './categoryVolume'
import soundDrop from './soundDrop'

export default [
  ...categoryManipulation,
  ...categorySoundPlay,
  ...categoryStop,
  ...categoryTagAdd,
  ...categoryVolume,
  ...soundDrop
]
