import axios from 'axios';
import { getJwt } from './authUtils';
const getDefaultConfig = () => {
  const jwt = getJwt();
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT
  const authorizationHeader = jwt ? { Authorization: `Bearer ${jwt}` } : {};
  return {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...authorizationHeader,
    },
    params: {},
    data: {},
  };
};

function get(url, params = {}, config = {}) {
  return executeRequest(url, { ...config, params });
}

function patch(url, data = {}, config = {}) {
  return executeRequest(url, {
    method: 'PATCH',
    data,
    ...config,
  });
}

function post(url, data = {}, params = {}, config = {}) {
  return executeRequest(url, {
    method: 'POST',
    data,
    params,
    ...config,
  });
}

function del(url, params = {}, config = {}) {
  return executeRequest(url, {
    method: 'DELETE',
    params,
    ...config,
  });
}

function put(url, data = {}, params = {}, config = {}) {
  return executeRequest(url, {
    method: 'PUT',
    data,
    params,
    ...config,
  });
}

async function executeRequest(url, config) {
  const finalConfig = { ...getDefaultConfig(), ...config, url };
  return axios.request(finalConfig).then(response => response);
}

export default { get, post, patch, put, del };
