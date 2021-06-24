/**
 *
 *
 * LocationList actions
 *
 */
import {
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  GET_LOCATIONS_COUNT_ROOMS,
  GET_LOCATIONS_COUNT_ROOMS_SUCCESS,
  GET_AMENITIES,
  GET_AMENITIES_FAIL,
  GET_AMENITIES_SUCCESS,
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

export const getLocationsCountRooms = () => ({
  type: GET_LOCATIONS_COUNT_ROOMS,
});

export const getLocationsCountRoomsSuccess = (data) => ({
  type: GET_LOCATIONS_COUNT_ROOMS_SUCCESS,
  payload: data,
});
export const getAmenities = () => ({
  type: GET_AMENITIES,
});

export const getAmenitiesSuccess = (data) => ({
  type: GET_AMENITIES_SUCCESS,
  payload: data,
});

export const getAmenitiesFail = (error) => ({
  type: GET_AMENITIES_FAIL,
  error,
});
