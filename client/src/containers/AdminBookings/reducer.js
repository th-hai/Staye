import produce from 'immer';
import {
  GET_BOOKINGS,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_SUCCESS,
  SHOW_MODAL,
} from './constants';

export const initialState = {
  bookings: [],
  loading: false,
  error: '',
  bookingModal: {
    visible: false,
  },
};

const adminLocationsReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case GET_BOOKINGS:
        draftState.loading = true;
        break;
      case GET_BOOKINGS_SUCCESS:
        draftState.loading = false;
        draftState.bookings = action.payload;
        draftState.error = null;
        break;
      case GET_BOOKINGS_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case SHOW_MODAL:
        draftState.bookingModal.visible = action.visible;
        break;
    }
  });

export default adminLocationsReducer;
