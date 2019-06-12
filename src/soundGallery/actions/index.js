import { createRoutine } from '../../actions/routines'

export const gallerySound = createRoutine('GALLERY_SOUND', [
  'PLAY'
])

export const gallerySearch = createRoutine('GALLERY_SEARCH', [
  'CLEAR',
  'FILTER_ERRORS_CHANGE',
  'FILTER_USED_CHANGE',
  'CHANGE'
])

export const galleryTarget = createRoutine('GALLERY_TARGET', [
  'CLEAR',
  'SET'
])
