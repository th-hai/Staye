import request from '../utils/request';

function login(email, password) {
  return request.post('v1/auth/login', {
    email,
    password,
  });
}

export const sendEmailResetPassword = email => {
  return request.post('v1/auth/forgot-password', { email });
}

export const resetPassword = (password, token) => {
  return request.post('v1/auth/reset-password', password, token);
}

export function resetPasswordByAdmin(username) {
  return request.patch(`v1/auth/generate-forgot-password/${username}`);
}

const exported = {
  login,
  sendEmailResetPassword,
  resetPassword
};

export default exported
