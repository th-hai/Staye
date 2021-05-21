import produce from 'immer'
import {
    GET_ROOM,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
} from './constants'

export const initialState = {
    rooms: [],
    loading: false,
    error: '',
};

const roomListReducer = (state = initialState, action) => 
    produce(state, draftState => {
        switch(action.type) {
            case GET_ROOM:
                draftState.loading = true;
                break;
            case GET_ROOM_SUCCESS:
                draftState.loading = false;
                draftState.rooms = action.payload;
                draftState.error = null;
                break;
            case GET_ROOM_FAIL:
                draftState.loading = false;
                draftState.error = action.error;
                break;
        }
    })
export default roomListReducer;