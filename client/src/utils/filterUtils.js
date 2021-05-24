import { filter, join, getOr, flatten } from 'lodash/fp';

export const filterByKey = (key, filters) =>
  filter(trainee => {
    const currentValue = getOr('')(key)(trainee);
    const filterValues = getOr([])(key)(filters);

    if (filterValues.length === 0) {
      return true;
    }

    if (currentValue === undefined) {
      return false;
    }

    return filterValues.includes(currentValue);
  });

export const filterBySearch = search =>
  filter(trainee =>
    join(', ')(flatten(Object.values(trainee)))
      .toLowerCase()
      .includes(search.toLowerCase())
  );
