import { remove } from 'diacritics';

export const clearSearch = search => remove(search)
  .trim()
  .replace(/[\s]/g, '-')
  .replace(/[-]+/g, '-');

export const stringSearch = (sample, search) => {
  const cleanSearch = clearSearch(search)
    .toLowerCase()
    .split('-');
  const cleanSample = remove(sample.toLowerCase());
  const results = cleanSearch.map(pattern => cleanSample.search(pattern));
  const searchResult = {
    relevant: results.every(item => item !== -1),
    results,
    searchSamples: cleanSearch,
  };
  return searchResult;
};
