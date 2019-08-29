import { categoryStore } from '../store'
import { clearSearch, splitSearchPatterns, stringSearch } from '../../search'
import { createSelector } from 'reselect'
import { FORM_SOUND_ADD } from '../constants'
import { formValueSelector } from 'redux-form'
import { soundStore } from '../../sounds'
import { tagStore } from '../../soundTags'

const getFilterForm = formValueSelector(FORM_SOUND_ADD)

export const getSoundSearchValueCleared = createSelector(
  state => getFilterForm(state, 'filter'),
  value => clearSearch(value)
)

export const getSearchFragments = createSelector(
  getSoundSearchValueCleared,
  splitSearchPatterns
)

function flagSounds (sounds, tags) {
  return sounds.map(sound => ({
    ...sound,
    tags: sound.tags
      .map(tagName => tags.find(tag => tag.name === tagName))
      .filter(tag => tag)
  }))
}

const getRelevantTags = createSelector(
  tagStore.getAll,
  getSoundSearchValueCleared,
  function (tags, search) {
    if (search) {
      return tags
        .map(tag => ({
          ...tag,
          relevance: stringSearch(tag.title, search, true) > 0
        }))
        .filter(tag => tag.relevance > 0)
    }
    return tags
  }
)

function getTagExt (sound, tags) {
  return tags
    .filter(tag => sound.tags.indexOf(tag.name) !== -1)
    .map(tag => tag.title)
    .join(' ')
}

const getUnusedSounds = createSelector(
  soundStore.getAll,
  categoryStore.getAll,
  (sounds, categories) => sounds.filter(sound => !categories.some(category => category.sounds.includes(sound.uuid)))
)

export const getFilteredSounds = createSelector(
  getUnusedSounds,
  tagStore.getAll,
  getRelevantTags,
  getSoundSearchValueCleared,
  (sounds, tags, relevantTags, search) => {
    let soundsFiltered = sounds
    if (search) {
      soundsFiltered = soundsFiltered
        .map((sound) => {
          const relevance = stringSearch(`${sound.name} ${getTagExt(sound, relevantTags)}`, search)
          return {
            ...sound,
            relevance
          }
        })
        .filter(sound => sound.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance)
    }
    return flagSounds(soundsFiltered.slice(0, 63), tags)
  }
)
