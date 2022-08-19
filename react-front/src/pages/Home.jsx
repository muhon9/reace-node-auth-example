import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { login, loading, error, user, accessToken } = useContext(AuthContext);

  return <div>Home Page</div>;
}

export default Home;
