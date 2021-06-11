import produce from 'immer'
import {
    GET_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_ROOMS_BY_LOCATION, 
    GET_ROOMS_BY_LOCATION_SUCCESS, 
    GET_ROOMS_BY_LOCATION_FAIL
} from './constants'

export const initialState = {
    locations: [],
    rooms: [],
    loading: false,
    error: '',
};

const filterRoomsReducer = (state = initialState, action) => 
    produce(state, draftState => {
        switch(action.type) {
            case GET_LOCATIONS:
                draftState.loading = true;
                break;
            case GET_LOCATIONS_SUCCESS:
                draftState.loading = false;
                draftState.locations = action.payload;
                draftState.error = null;
                break;
            case GET_LOCATIONS_FAIL:
                draftState.loading = false;
                draftState.error = action.error;
                break;
            case GET_ROOMS_BY_LOCATION:
                draftState.loading = true;
                break;
            case GET_ROOMS_BY_LOCATION_SUCCESS:
                draftState.loading = false;
                draftState.rooms = action.payload;
                draftState.error = null;
                break;
            case GET_ROOMS_BY_LOCATION_FAIL:
                draftState.loading = false;
                draftState.error = action.error;
                break;
        }
    })
export default filterRoomsReducer;