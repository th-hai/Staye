import {
  GET_LOCATIONS,
  GET_LOCATIONS_FAIL,
  GET_LOCATIONS_SUCCESS,
  SHOW_MODAL,
  CREATE_LOCATIONS,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILED,
  UPDATE_LOCATIONS,
  UPDATE_LOCATIONS_SUCCESS,
  UPDATE_LOCATIONS_FAILED,
  DELETE_LOCATIONS,
  DELETE_LOCATIONS_SUCCESS,
  DELETE_LOCATIONS_FAILED,
} from './constants';

export const getLocations = () => ({
  type: GET_LOCATIONS,
});

export const getLocationsSuccess = (data) => ({
  type: GET_LOCATIONS_SUCCESS,
  payload: data,
});

export const getLocationsFail = (error) => ({
  type: GET_LOCATIONS_FAIL,
  error,
});

export const createLocation = (location) => ({
  type: CREATE_LOCATIONS,
  location,
});

export const createLocationSuccess = (location) => ({
  type: CREATE_LOCATIONS_SUCCESS,
  location,
});

export const createLocationFailed = (error) => ({
  type: CREATE_LOCATIONS_FAILED,
  error,
});

export const updateLocation = (id, location) => ({
  type: UPDATE_LOCATIONS,
  id,
  location,
});

export const updateLocationSuccess = (location) => ({
  type: UPDATE_LOCATIONS_SUCCESS,
  location,
});

export const updateLocationFailed = (error) => ({
  type: UPDATE_LOCATIONS_FAILED,
  error,
});

export const deleteLocation = (id) => ({
  type: DELETE_LOCATIONS,
  id,
});

export const deleteLocationSuccess = (id) => ({
  type: DELETE_LOCATIONS_SUCCESS,
  id,
});

export const deleteLocationFailed = (error) => ({
  type: DELETE_LOCATIONS_FAILED,
  error,
});

export const showLocationModal = (visible) => ({
  type: SHOW_MODAL,
  visible,
});
