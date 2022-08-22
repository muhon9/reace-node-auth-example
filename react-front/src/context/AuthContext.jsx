import { useState, createContext, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : undefined
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function login(email, password) {
    await axios
      .post(`${import.meta.env.VITE_API_ROOT}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log();
        setAuthTokens(res.data.tokens);
        setUser(res.data.user);
        localStorage.setItem('authTokens', JSON.stringify(res.data.tokens));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  }

  async function registration(name, email, password) {
    await axios
      .post(`${import.meta.env.VITE_API_ROOT}/auth/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log();
        setAuthTokens(res.data.tokens);
        setUser(res.data.user);
        localStorage.setItem('authTokens', JSON.stringify(res.data.tokens));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  }

  async function logout() {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
    setUser(null);
    setAuthTokens(null);
    await axios.post(`${import.meta.env.VITE_API_ROOT}/auth/logout`, {
      refreshToken: authTokens?.refresh.token,
    });
  }

  useEffect(() => {
    setLoading(false);
    console.log(authTokens);
  }, [authTokens, loading]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    login,
    logout,
    authTokens,
    user,
    setAuthTokens,
    setUser,
    loading,
    error,
    setError,
    registration,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
