import { createSelector } from 'reselect';

const selectGlobal = (state) => state.global;
const selectRouter = (state) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

const makeSelectJwt = () =>
  createSelector(selectGlobal, (globalState) => globalState?.jwt);

const makeSelectIsLoggedIn = () =>
  createSelector(selectGlobal, (globalState) => {
    if (globalState?.jwt) {
      return !globalState.jwt.isEmpty;
    }
    return false;
  });

const makeSelectIsPending = () =>
  createSelector(selectGlobal, (globalState) => globalState?.pending);

const makeSelectUser = () =>
  createSelector(selectGlobal, (globalState) => globalState?.user);

const makeSelectRole = () =>
  createSelector(selectGlobal, (globalState) => globalState?.user?.role);

export {
  makeSelectLocation,
  makeSelectJwt,
  makeSelectIsLoggedIn,
  makeSelectIsPending,
  makeSelectUser,
  makeSelectRole,
};
