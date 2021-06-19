import produce from 'immer';
import { GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_FAIL, SHOW_MODAL } from './constants';

export const initialState = {
  room: {},
  loading: false,
  error: '',
  roomModal: {
    visible: false,
  },
};

const roomListReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case GET_ROOM:
        draftState.loading = true;
        break;
      case GET_ROOM_SUCCESS:
        draftState.loading = false;
        draftState.room = action.payload;
        draftState.error = null;
        break;
      case GET_ROOM_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case SHOW_MODAL:
        draftState.roomModal.visible = action.visible;
        break;
    }
  });
export default roomListReducer;
