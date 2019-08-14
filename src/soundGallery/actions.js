import { createEntityRoutines } from 'redux-entity-routines'

export const browseRoutines = createEntityRoutines('GALLERY_BROWSE', [
  'SELECT_LIBRARY',
  'SELECT_MODULE'
], true)

export const gallerySound = createEntityRoutines('GALLERY_SOUND', [
  'PLAY'
])

export const gallerySearch = createEntityRoutines('GALLERY_SEARCH', [
  'CLEAR',
  'FILTER_ERRORS_CHANGE',
  'FILTER_USED_CHANGE',
  'CHANGE'
])

export const galleryTarget = createEntityRoutines('GALLERY_TARGET', [
  'CLEAR',
  'SET'
])
