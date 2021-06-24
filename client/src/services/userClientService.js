import request from '../utils/request';

export function createUser(user) {
  return request.post('v1/auth/register', user);
}
export function updateUser(id, user) {
  return request.patch(`/v1/users/${id}`, user);
}
