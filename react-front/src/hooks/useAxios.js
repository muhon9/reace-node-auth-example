import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { getStoredTokens, storeToken } from '../utils/authToken';

const UseAxios = () => {
  const { setTokens, setUser, tokens } = useContext(AuthContext);
  const baseURL = 'http://localhost:8000/v1';
  const navigate = useNavigate();

  const axiosinstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getStoredTokens()
        ? `Bearer ${getStoredTokens().access.token}`
        : undefined,
    },
  });

  // eslint-disable-next-line consistent-return
  axiosinstance.interceptors.request.use(async (req) => {
    if (!tokens) {
      navigate('/login');
    }
    console.log('interceptor ran');
    const decoded = jwtDecode(tokens?.access.token);
    const isExpired = moment().unix() - decoded.exp > 1;
    console.log(isExpired, 'isExpired');
    if (!isExpired) return req;
    // we will send request to the refresh token
    const response = await axios.post(`${baseURL}/auth/refresh-tokens`, {
      refreshToken: tokens.refresh.token,
    });
    console.log('response from refresh token', response.data);
    req.headers.Authorization = response.data.access.token;
    setTokens(response.data);
    storeToken(response.data);
    return req;
  });

  return axiosinstance;
};

export default UseAxios;
