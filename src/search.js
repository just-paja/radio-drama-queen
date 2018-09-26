import { remove } from 'diacritics';

export const clearSearch = search => remove(search)
  .trim()
  .replace(/[\s]/g, '-')
  .replace(/[-]+/g, '-');

export const splitSearchPatterns = search => clearSearch(search)
  .toLowerCase()
  .split('-');

export const stringSearch = (sample, search, inclusive = false) => {
  const cleanSearch = splitSearchPatterns(search);
  const cleanSample = remove(sample.toLowerCase());
  const results = cleanSearch.map(pattern => cleanSample.search(pattern));
  const searchResult = {
    relevant: inclusive
      ? results.some(item => item !== -1)
      : results.every(item => item !== -1),
    results,
    searchSamples: cleanSearch,
  };
  return searchResult;
};
