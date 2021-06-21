import produce from 'immer';
import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './constants';
export const initialState = {
  loading: false,
  error: '',
};
const userProfileReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case UPDATE_USER:
        draftState.loading = true;
        break;
      case UPDATE_USER_SUCCESS:
        draftState.loading = false;
        draftState.error = null;
        break;
      case UPDATE_USER_FAILED:
        draftState.loading = false;
        draftState.error = action.error;
        break;
    }
  });

export default userProfileReducer;
