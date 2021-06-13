import produce from 'immer';
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

export const initialState = {
  locations: [],
  locationsCountRooms: [],
  loading: false,
  error: '',
};

const locationListReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case GET_LOCATIONS:
        draftState.loading = true;
        break;
      case GET_LOCATIONS_SUCCESS:
        draftState.loading = false;
        draftState.locations = action.payload;
        draftState.error = null;
        break;
      case GET_LOCATIONS_COUNT_ROOMS:
        draftState.loading = true;
        break;
      case GET_LOCATIONS_COUNT_ROOMS_SUCCESS:
        draftState.loading = false;
        draftState.locationsCountRooms = action.payload;
        draftState.error = null;
        break;
      case GET_LOCATIONS_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case GET_AMENITIES:
        draftState.loading = true;
        break;
      case GET_AMENITIES_SUCCESS:
        draftState.loading = false;
        draftState.amenities = action.payload;
        draftState.error = null;
        break;
      case GET_AMENITIES_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
    }
  });
export default locationListReducer;
