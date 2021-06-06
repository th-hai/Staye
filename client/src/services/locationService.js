import request from '../utils/request';

export function getLocations() {
  return request.get('/v1/locations');
}

export function createLocation(location) {
  return request.post('/v1/locations', location);
}

export function updateLocation(id, location) {
  return request.put(`/v1/locations/${id}`, location);
}

export function deleteLocation(id) {
  return request.del(`/v1/locations/${id}`);
}
