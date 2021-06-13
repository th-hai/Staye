import request from '../utils/request';

export function getRooms() {
  return request.get('/v1/rooms?limit=100');
}

export function getRoomsByLocation(location) {
  return request.get(`/v1/rooms/location/${location}`);
}
export function getOwners() {
  return request.get('/v1/users?role=owner');
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
