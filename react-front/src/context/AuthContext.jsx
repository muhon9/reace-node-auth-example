import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import api from '../utils/api';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState(undefined);
  const [accessToken, setAccessToken] = useState(undefined);
  const [refreshToken, setRefreshToken] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function login(email, password) {
    setLoading(true);
    const data = await api.post('/login', { email, password });
    console.log('Data', data);
    // axios
    //   .post(`${import.meta.env.VITE_API_ROOT}/login`, {
    //     email,
    //     password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setUser(res.data.user);
    //     setAccessToken(res.data.tokens.access.token);
    //     setRefreshToken(res.data.tokens.refresh.token);
    //     setLoading(false);
    //     setError('');
    //     localStorage.setItem(
    //       'token',
    //       JSON.stringify(res.data.tokens.refresh.token)
    //     );
    //     (err) => {
    //       console.log(err);
    //     };
    //   });
  }

  function logout() {}

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    login,
    logout,
    user,
    accessToken,
    refreshToken,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
