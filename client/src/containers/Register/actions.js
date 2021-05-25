import {REGISTER, REGISTER_SUCCESS, REGISTER_FAILED} from './constants';

export function register(user) {
    return {
        type: REGISTER,
        user,
    };
}

export function registerSuccess(user) {
    return {
        type: REGISTER_SUCCESS,
        user,
    };
}

export function registerFailed(error)
{
    return {
        type: REGISTER_FAILED,
        error,
    };
}