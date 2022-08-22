import { useState, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle

import {
  getStoredTokens,
  getStoredUser,
  removeToken,
  removeUser,
  storeToken,
  storeUser,
} from '../utils/authToken';
// eslint-disable-next-line import/no-cycle
import UseAxios from '../hooks/useAxios';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState(
    getStoredUser() ? getStoredUser() : undefined
  );
  const [tokens, setTokens] = useState(
    getStoredTokens() ? getStoredTokens() : undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const api = UseAxios();

  if (!user || !tokens) {
    if (getStoredTokens() && getStoredUser()) {
      setUser(getStoredUser());
      setTokens(getStoredTokens());
    }
  }

  async function login(email, password) {
    console.log('Email', email);
    setLoading(true);
    api
      .post('/auth/login', { email, password })
      .then((data) => {
        setUser(data.user);
        setTokens(data.tokens);
        setLoading(false);
        setError('');
        storeToken(data.tokens);
        storeUser(data.user);
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        setError(err);
        console.log('err');
        setLoading(false);
      });
  }

  async function logout() {
    console.log('logout');
    removeToken();
    removeUser();
    setUser(undefined);
    setTokens(undefined);
    navigate('/login');
    await api.post('/auth/logout', {
      refreshToken: tokens.refresh.token,
    });
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    login,
    logout,
    user,
    setUser,
    setTokens,
    tokens,
    loading,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
