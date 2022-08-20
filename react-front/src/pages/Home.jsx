import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Home() {
  const { login, loading, error, user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/users').then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <div>You are currently loged in</div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
