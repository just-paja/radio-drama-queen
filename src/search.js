export const clearSearch = search => search
  .trim()
  .replace(/[\s]/g, '-')
  .replace(/[-]+/g, '-');

export const stringSearch = (sample, search) => {
  const cleanSearch = clearSearch(search)

    .toLowerCase()
    .split('-');
  const cleanSample = sample.toLowerCase();
  const results = cleanSearch.map(pattern => cleanSample.search(pattern));
  const searchResult = {
    relevant: results.every(item => item !== -1),
    results,
    searchSamples: cleanSearch,
  };
  return searchResult;
};
