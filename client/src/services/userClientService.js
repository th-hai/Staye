import request from '../utils/request';

export function createUser(user) {
    return request.post('v1/auth/register', user);
  }