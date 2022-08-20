import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
