import { remove } from 'diacritics'

function filterNonEmpty (item) {
  return Boolean(item)
}

function filterUnique (item, index, src) {
  return src.indexOf(item) === index
}

export const clearSearch = search => {
  if (!search) {
    return ''
  }
  return remove(search)
    .trim()
    .replace(/[\s]/g, '-')
    .replace(/[-]+/g, '-')
}

export const splitSearchPatterns = search => clearSearch(search)
  .toLowerCase()
  .split('-')
  .filter(filterNonEmpty)
  .filter(filterUnique)

function getRelevance (sample, searchPatterns, inclusive) {
  const results = searchPatterns.map((pattern, patternIndex, array) => {
    const searchIndex = sample.search(pattern)
    const resultIndexScore = Math.sign(searchIndex) * (searchPatterns.length - patternIndex)
    const substrIndexScore = searchIndex >= 0 ? sample.length - searchIndex : 0
    return Math.max(0, resultIndexScore + substrIndexScore)
  })
  return (inclusive || results.every(num => num > 0))
    ? results.reduce((aggr, num) => aggr + num)
    : 0
}

export const stringSearch = (sample, search, inclusive = false) => {
  return getRelevance(
    remove(sample.toLowerCase()),
    splitSearchPatterns(search),
    inclusive
  )
}
