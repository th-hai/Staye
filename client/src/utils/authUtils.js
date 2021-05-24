import jwtDecode from 'jwt-decode';

const JWT = 'jwt';
const USER = 'user';

export function storeJwt(jwt) {
  localStorage.setItem(JWT, jwt);
}

export function getJwt() {
  return localStorage.getItem(JWT);
}

export function removeJwt() {
  return localStorage.removeItem(JWT);
}

export function storeUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}

export function getUser() {
  const rawUser = localStorage.getItem(USER);
  return rawUser && JSON.parse(rawUser);
}

export function removeUser() {
  localStorage.removeItem(USER);
}

export function isTokenExpired() {
  try {
    const { exp } = jwtDecode(getJwt());
    return Date.now() >= exp * 1000;
  } catch (ex) {
    return true;
  }
}
