import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UseAxios from '../hooks/useAxios';

function Home() {
  const { login, loading, error, user, tokens } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const api = UseAxios();

  useEffect(() => {
    api.get(`/users/${user.id}`).then((res) => {
      setUsers(res.data);
    });
  }, [user, tokens]);

  return (
    <div>
      {user && (
        <div>
          <div>You are currently loged in</div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}

export default Home;
