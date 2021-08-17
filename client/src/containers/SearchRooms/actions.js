import { SEARCH_ROOMS, SEARCH_ROOMS_FAIL, SEARCH_ROOMS_SUCCESS, SET_SORT_BY } from "./constants";


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

export const setSortBy = (data) => ({
    type: SET_SORT_BY,
    payload: data,
})