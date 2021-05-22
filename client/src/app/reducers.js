/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../app/utils/history';
// import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from './containers/HomeContainers/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    // language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}