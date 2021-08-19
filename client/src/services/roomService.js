import request from '../utils/request';
import { createURLSearchParams } from 'utils/urlUtils';

export function getRooms() {
  return request.get('/v1/rooms?limit=1000');
}

export function getFavouriteRooms() {
  return request.get('/v1/rooms/favourite');
}

export function getRoom(id) {
  return request.get(`/v1/rooms/${id}`);
}

export function getRoomsByLocation(location) {
  return request.get(`/v1/rooms/location/${location}`);
}

export function searchRooms(params) {
  if (!params.limit) {
      params = { ...params, limit:20}
  }
  return request.get(`/v1/rooms/search?${createURLSearchParams(params)}`)
}

export function getOwners() {
  return request.get('/v1/users?role=owner');
}

export function getUsers() {
  return request.get('/v1/users?limit=100');
}

export function createRoom(room) {
  return request.post('/v1/rooms', room);
}

export function updateRoom(id, room) {
  return request.patch(`/v1/rooms/${id}`, room);
}



export function deleteRoom(id) {
  return request.del(`/v1/rooms/${id}`);
}

export function deleteUser(id) {
  return request.del(`/v1/users/${id}`);
}