import produce from 'immer';
import {
  GET_LOCATIONS,
  GET_LOCATIONS_FAIL,
  GET_LOCATIONS_SUCCESS,
  SHOW_MODAL,
} from './constants';

export const initialState = {
  locations: [],
  loading: false,
  error: '',
  locationModal: {
    visible: false,
  },
};

const adminLocationsReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case GET_LOCATIONS:
        draftState.loading = true;
        break;
      case GET_LOCATIONS_SUCCESS:
        draftState.locations = action.payload;
        draftState.error = null;
        break;
      case GET_LOCATIONS_FAIL:
        draftState.loading = false;
        draftState.error = action.error;
        break;
      case SHOW_MODAL:
        draftState.locationModal.visible = action.visible;
        break;
    }
  });

export default adminLocationsReducer;
