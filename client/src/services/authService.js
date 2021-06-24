import request from '../utils/request';

function login(email, password) {
  return request.post('v1/auth/login', {
    email,
    password,
  });
}

export const sendEmailResetPassword = email =>
  request.post('v1/auth/forgot-password', { email });

export const resetPassword = (password, token) => {
  return request.post('v1/auth/reset-password', password, token);
}

export function resetPasswordByAdmin(username) {
  return request.patch(`v1/auth/generate-forgot-password/${username}`);
}

export default {
  login,
  sendEmailResetPassword,
  resetPassword
};
