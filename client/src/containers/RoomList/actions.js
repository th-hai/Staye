/**
 * 
 * 
 * CompetencyList actions
 * 
 */
import {
    GET_ROOM,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
} from './constants'

export const getRoom = () => ({
    type: GET_ROOM,
});

export const getRoomSuccess = data => ({
    type: GET_ROOM_SUCCESS,
    payload: data,
});

export const getRoomFail = error => ({
    type: GET_ROOM_FAIL,
    error,
});
