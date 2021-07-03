import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
import get from 'lodash/fp/get';
const selectLocationListDomain = (state) => state[reducerKey] || initialState;
const makeSelectLocationListDomain = createSelector(
  selectLocationListDomain,
  (state) => state
);
const makeSelectLocations = createSelector(
  makeSelectLocationListDomain,
  (state) => state.locations
);
const makeSelectLocationModal = createSelector(
  makeSelectLocationListDomain,
  get('locationModal')
);

export {
  makeSelectLocations,
  makeSelectLocationModal,
};
