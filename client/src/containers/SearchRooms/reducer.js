import produce from 'immer';
import { SEARCH_ROOMS, SEARCH_ROOMS_FAIL, SEARCH_ROOMS_SUCCESS } from './constants';

export const initialState = {
    rooms: [],
    loading: false,
    error: '',
};

const searchRoomsReducer = (state = initialState, action) =>
    produce(state, (draftState) => {
        switch (action.type) {
            case SEARCH_ROOMS:
                draftState.loading = true;
                break;
            case SEARCH_ROOMS_SUCCESS:
                draftState.loading = false;
                draftState.rooms = action.payload;
                draftState.error = null;
                break;
            case SEARCH_ROOMS_FAIL:
                draftState.loading = false;
                draftState.error = action.error;
                break;
            
        }
    });
export default searchRoomsReducer;
