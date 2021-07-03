import produce from 'immer';
import { CREATE_BOOKING, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAIL, REDIRECT } from './constants';

export const initialState = {
  bookingBody: {
    room: '',
    customer: 20,
    from: '',
    to: '',
    totalGuest: 1,
    price: null,
  },
  loading: false,
  successful: false,
  error: ''
};

const checkoutReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case CREATE_BOOKING:
        draftState.loading = true;
        break;
      case CREATE_BOOKING_SUCCESS:
        draftState.loading = false;
        draftState.bookingBody = action.payload;
        draftState.successful = true;
        draftState.error = null;
        break;
      case CREATE_BOOKING_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case REDIRECT:
        draftState.successful = false;
        break;
    }
  });
export default checkoutReducer;
