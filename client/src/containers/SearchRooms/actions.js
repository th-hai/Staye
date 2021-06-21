import { SEARCH_ROOMS, SEARCH_ROOMS_FAIL, SEARCH_ROOMS_SUCCESS } from "./constants";


export const searchRooms = (params) => ({
    type: SEARCH_ROOMS,
    params
});

export const searchRoomsSuccess = (data) => ({
    type: SEARCH_ROOMS_SUCCESS,
    payload: data,
});

export const searchRoomsFail = (error) => ({
    type: SEARCH_ROOMS_FAIL,
    error,
});