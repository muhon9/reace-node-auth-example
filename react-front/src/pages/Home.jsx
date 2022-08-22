import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Home.module.css';

function Home() {
  const { login, loading, error, user, authTokens } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const api = useAxios();

  // a dummy user used during styling
  // const user = {
  //   name: 'Sultan AL Muhon',
  //   email: 'sultan.al.muhon@gmail.com',
  //   id: 'lkjle6+59+ea+5',
  // };

  useEffect(() => {
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
  }, [authTokens]);

  return (
    <div className={styles.home}>
      <div className={styles.titles}>
        <h3>
          Current Status{' '}
          <span style={{ backgroundColor: `${user ? 'green' : 'brown'}` }}>
            {user ? 'Loged In' : 'Loged Out'}
          </span>
        </h3>
        {!user && (
          <h3>
            Please <Link to="/login">Log In</Link> to see the details!
          </h3>
        )}
        {user && authTokens && (
          <h3>
            Welcome{' '}
            <span style={{ backgroundColor: `${user ? 'green' : 'brown'}` }}>
              {user.name.split(' ')[0]}
            </span>
          </h3>
        )}
      </div>
    </div>
  );
}

export default Home;
