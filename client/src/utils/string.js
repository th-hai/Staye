import getOr from 'lodash/fp/getOr';

const getOrEmpty = getOr('');

export const makeStringSorter = key => (a, b) =>
  getOrEmpty(key)(a).localeCompare(getOrEmpty(key)(b));
