import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

export function AuthProvider(props) {
  function login() {

  }

  function logout() {

  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
