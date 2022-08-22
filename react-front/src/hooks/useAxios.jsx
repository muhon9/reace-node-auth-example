import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAxios = () => {
  const baseURL = 'http://localhost:8000/v1';
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access.token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    console.log('Interceptor ran');

    const user = jwtDecode(authTokens.access.token);
    console.log(user);
    const isExpired = user.exp - moment().unix() < 5;
    console.log(isExpired);

    if (!isExpired) {
      console.log('first');
      return req;
    }

    const response = await axios.post(`${baseURL}/auth/refresh-tokens`, {
      refreshToken: authTokens.refresh.token,
    });
    console.log(response.data);
    console.log('triggered');

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    setAuthTokens(response.data);
    // setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access.token}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
