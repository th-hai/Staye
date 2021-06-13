import request from '../utils/request';

function login(email, password) {
  return request.post('v1/auth/login', {
    email,
    password,
  });
}

export const sendEmailResetPassword = email =>
  request.post('/auth/forgot-password', { email });

export const resetPasswordRequest = input =>
  request.post('/auth/reset-password', input);

export function resetPasswordByAdmin(username) {
  return request.patch(`/auth/generate-forgot-password/${username}`);
}

export default {
  login,
};
