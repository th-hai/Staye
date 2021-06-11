import request from '../utils/request';

export function getRooms() {
  return request.get('/v1/rooms');
}

export function getRoomsByLocation(location) {
  return request.get(`/v1/rooms/location/${location}`);
}

export function createRoom(competency) {
  return request.post('/v1/rooms', competency);
}

export function updateRoom(id, competency) {
  return request.put(`/v1/rooms/${id}`, competency);
}

export function deleteRoom(id) {
  return request.del(`/v1/rooms/${id}`);
}
