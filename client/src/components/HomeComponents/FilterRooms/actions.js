/**
 *
 *
 * FilterRooms actions
 *
 */
 import {
    GET_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_ROOMS_BY_LOCATION,
    GET_ROOMS_BY_LOCATION_SUCCESS,
    GET_ROOMS_BY_LOCATION_FAIL,
} from './constants'

export const getLocations = () => ({
    type: GET_LOCATIONS,
});

export const getLocationsSuccess = data => ({
    type: GET_LOCATIONS_SUCCESS,
    payload: data,
});

export const getLocationsFail = error => ({
    type: GET_LOCATIONS_FAIL,
    error,
});

  export const getRoomsByLocation = (location) => ({
    type: GET_ROOMS_BY_LOCATION,
    location
  });
  
  export const getRoomsByLocationSuccess = (data) => ({
    type: GET_ROOMS_BY_LOCATION_SUCCESS,
    payload: data,
  });
  
  export const getRoomsByLocationFail = (error) => ({
    type: GET_ROOMS_BY_LOCATION_FAIL,
    error,
  });