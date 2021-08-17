import produce from 'immer';
import { SEARCH_ROOMS, SEARCH_ROOMS_FAIL, SEARCH_ROOMS_SUCCESS, SET_SORT_BY } from './constants';

export const initialState = {
    roomsResult: {
        results: [],
        limit: 20,
        page: 1,
        totalResults: 0,
        totalPages: 0,
    },
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
                draftState.roomsResult = action.payload;
                draftState.error = null;
                break;
            case SEARCH_ROOMS_FAIL:
                draftState.loading = false;
                draftState.error = action.error;
                break;
         
        }
    });
export default searchRoomsReducer;
