function sortByYear(arr) {
  // Sort ascending
  return arr.sort((a, b) => a.year - b.year);
}

function sortByValue(arr) {
  // Sort descending
  return arr.sort((a, b) => a.value + b.value);
}

function getListOfYearsAscending(arr) {
  // Remove duplicates
  return [...new Set(arr.map(el => el.year))];
}

function getListOfStates(arr) {
  // Remove duplicates
  return [...new Set(arr.map(el => el.island))];
}

function getNextYear(arr, value) {
  const { length } = arr;

  const lastIndex = arr.indexOf(arr[length - 1]);
  const currentIndex = arr.indexOf(value);

  // if we're at the end of the array - start over
  if (currentIndex === lastIndex) {
    return arr[0];
  }
  return arr[currentIndex + 1];
}

function getDataByYear(arr, year) {
  return arr.filter(item => item.year === year);
}

function getDataByIsland(arr, island) {
  return arr.filter(item => item.island === island);
}

// make 'value' key available to chart lib
function populationToValue(data) {
  return data.map(d => {
    // eslint-disable-next-line no-param-reassign
    d.value = d.pigPopulation;
    return d;
  });
}

function getProgress(arr, value) {
  const pos = arr.indexOf(value);

  const last = arr.length - 1;

  if (pos === 0) {
    return 0;
  }

  return (pos / last) * 100;
}

export {
  sortByYear,
  sortByValue,
  getListOfYearsAscending,
  getListOfStates,
  getNextYear,
  getDataByIsland,
  getDataByYear,
  populationToValue,
  getProgress
};
