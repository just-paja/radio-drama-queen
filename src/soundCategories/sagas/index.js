import categoryCreate from './categoryCreate'
import categoryLoopToggle from './categoryLoopToggle'
import categoryRemove from './categoryRemove'
import categorySoundPlay from './categorySoundPlay'
import categoryStop from './categoryStop'
import categoryTagAdd from './categoryTagAdd'
import categoryVolume from './categoryVolume'
import soundDrop from './soundDrop'
import soundLoad from './soundLoad'

export * from './categoryCreate'

export default [
  ...categoryCreate,
  ...categoryLoopToggle,
  ...categoryRemove,
  ...categorySoundPlay,
  ...categoryStop,
  ...categoryTagAdd,
  ...categoryVolume,
  ...soundDrop,
  ...soundLoad
]
