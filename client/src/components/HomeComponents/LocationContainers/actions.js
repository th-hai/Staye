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
