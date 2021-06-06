import produce from 'immer'
import {
    GET_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAIL,
} from './constants'

export const initialState = {
    locations: [],
    loading: false,
    error: '',
};

const locationListReducer = (state = initialState, action) => 
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
        }
    })
export default locationListReducer;