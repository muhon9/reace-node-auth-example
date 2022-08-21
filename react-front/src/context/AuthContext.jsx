import { useState, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import api from '../utils/api';
import {
  getStoredTokens,
  getStoredUser,
  removeToken,
  removeUser,
  storeToken,
  storeUser,
} from '../utils/authToken';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
      .post('/login', { email, password })
      .then((data) => {
        console.log(data);
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

  function logout() {
    removeToken();
    removeUser();
    setUser(undefined);
    setTokens(undefined);
  }

  function seterror(err) {
    setError(err);
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
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
