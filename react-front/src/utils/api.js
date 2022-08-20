import axios from 'axios';
import { useContext } from 'react';

// const { accessToken } = useContext(AuthContext);

const defaults = {
  baseUrl: 'http://localhost:3000/api',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer `,
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
      url: `${defaults.baseURL}/${url}`,
      //   url: 'http://localhost:3000/api/users',
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
          if (error.response.data.error.code === 'INVALID_TOKEN') {
            console.log('Invalid token');
          } else {
            reject(error.response.data.error);
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
