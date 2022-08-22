import axios from 'axios';
import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from '../context/AuthContext';
import { getStoredTokens } from './authToken';

const defaults = {
  baseUrl: `${import.meta.env.VITE_API_ROOT}`,
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredTokens()
      ? `Bearer ${getStoredTokens().access.token}`
      : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message:
      'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseUrl}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
    }).then(
      (response) => {
        console.log('Form api', response);
        resolve(response.data);
      },
      (error) => {
        console.log('Form api error', error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log('Invalid token');
          } else {
            reject(error.response.data);
          }
        } else {
          reject(defaults.error);
        }
      }
    );
  });

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
};
