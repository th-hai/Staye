import request from '../utils/request';

export function getRooms() {
  return request.get('/v1/rooms');
}

export function createRooms(competency) {
  return request.post('/v1/rooms', competency);
}

export function updateRooms(id, competency) {
  return request.put(`/v1/rooms/${id}`, competency);
}

export function deleteRooms(id) {
  return request.del(`/v1/rooms/${id}`);
}