import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { login, loading, error, user, authTokens } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const api = useAxios();

  useEffect(
    (params) => {
      if (authTokens) {
        api
          .get(`/users/${user?.id}`)
          .then((res) => {
            setUserDetails(res.data);
          })
          .catch((err) => {
            // console.log('Error', err?.response.data.message);
          });
      }
    },
    [authTokens]
  );

  return (
    <div>
      <div>You are currently loged out</div>
      <div>
        Please <Link to="/login">Log In</Link> to see the details
      </div>
      {authTokens && user && (
        <div>
          <div>You are currently loged in</div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Email: {user.id}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
