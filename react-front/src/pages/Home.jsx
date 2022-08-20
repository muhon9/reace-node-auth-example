import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Home() {
  const { login, loading, error, user, accessToken } = useContext(AuthContext);

  useEffect(() => {
    api.get('/users').then((data) => {
      console.log(data);
    });
  }, []);

  return <div>Home Page</div>;
}

export default Home;
