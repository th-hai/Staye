import produce from 'immer';
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, REDIRECT} from './constants'

const initialState = {
    user: '',
    pending: false,
    successful: false,
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
        case REDIRECT:
            draft.successful = false;
            break;
            
    }
});

export default registerReducer;