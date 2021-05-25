import produce from 'immer';
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED} from './constants'

const initialState = {
    // username: '',
    // email: '',
    // password: '',
    user: '',
};

const registerReducer = (state = initialState, action) => 
produce(state, draft => {
    switch(action.type) {
        case REGISTER:
            draft.pending = true;
            draft.user = undefined;
            draft.successful = false;
            break;
        case REGISTER_SUCCESS:
            draft.pending = false;
            draft.user = action.user;
            draft.successful = true;
            break;
        case REGISTER_FAILED:
            draft.pending = false;
            draft.user = undefined;
            draft.successful = false;
            break;
    }
});

export default registerReducer;