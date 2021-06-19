import request from '../utils/request';

export function getRooms() {
  return request.get('/v1/rooms?limit=100');
}

export function getRoom(id) {
  return request.get(`/v1/rooms/${id}`);
}

export function createRoom(room) {
  return request.post('/v1/rooms', room);
}

export function updateRoom(id, room) {
  return request.put(`/v1/rooms/${id}`, room);
}

export function deleteRoom(id) {
  return request.del(`/v1/rooms/${id}`);
}
