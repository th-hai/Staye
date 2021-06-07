import produce from 'immer';
import {
  GET_ROOM,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  SHOW_MODAL,
  UPLOAD_PHOTOS,
  UPLOAD_PHOTOS_SUCCESS,
} from './constants';

export const initialState = {
  rooms: [],
  loading: false,
  error: '',
  roomModal: {
    visible: false,
  },
  photoUrls: [],
};

const roomListReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
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
        case GET_ROOMS_BY_LOCATION:
        draftState.loading = true;
        break;
      case GET_ROOMS_BY_LOCATION_SUCCESS:
        draftState.loading = false;
        draftState.roomsAutocomplete = action.payload;
        draftState.error = null;
        break;
      case GET_ROOMS_BY_LOCATION_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case SHOW_MODAL:
        draftState.roomModal.visible = action.visible;
        break;
      case UPLOAD_PHOTOS:
        draftState.loading = true;
        break;
      case UPLOAD_PHOTOS_SUCCESS:
        draftState.loading = false;
        draftState.photoUrls = action.photoUrls
    }
  });
export default roomListReducer;
