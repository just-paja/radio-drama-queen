import soundLoad from './soundLoad'
import soundPlay from './soundPlay'
import soundRegister from './soundRegister'
import soundStop from './soundStop'
import soundStopAll from './soundStopAll'
import soundToggle from './soundToggle'
import soundUnload from './soundUnload'
import soundVolumeChange from './soundVolumeChange'

export * from './soundLoad'

export default [
  ...soundLoad,
  ...soundPlay,
  ...soundRegister,
  ...soundStop,
  ...soundStopAll,
  ...soundToggle,
  ...soundUnload,
  ...soundVolumeChange
]
