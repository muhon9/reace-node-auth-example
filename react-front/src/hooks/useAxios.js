import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { AuthContext } from '../context/AuthContext';
import { getStoredTokens } from '../utils/authToken';

const UseAxios = () => {
  const { setTokens, setUser, tokens } = useContext(AuthContext);

  const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getStoredTokens()
        ? `Bearer ${getStoredTokens().access.token}`
        : undefined,
    },
  });

  axiosinstance.interceptors.request.use((req) => {
    console.log('interceptor ran');
    const decoded = jwtDecode(tokens.access.token);
    const isExpired = moment().unix() - decoded.exp > 1;
    if (!isExpired) {
      return req;
    }
    // we will send request to the refresh token
  });

  return axiosinstance;
};

export default UseAxios;
