import { createRoutine } from '../actions/routines'
import { createEntityRoutines } from 'redux-entity-routines'

export const browseRoutines = createEntityRoutines('GALLERY_BROWSE', [
  'SELECT_LIBRARY',
  'SELECT_MODULE'
], true)

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
