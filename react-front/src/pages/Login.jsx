import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error, user, accessToken } = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div>
      {user && JSON.stringify(accessToken)}
      {user && <Navigate to="/" />}
      {!user && (
        <>
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <div className={styles.form_title}>Login</div>
            <div className={styles.form_fields}>
              <div className={styles.form_field}>
                <label htmlFor="email">
                  Email:
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className={styles.form_field}>
                <label htmlFor="password">
                  Password:
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
            <div className={styles.button}>
              <button type="submit">Login</button>
            </div>
          </form>
          <div className={styles.signup_call}>
            Don't have account?
            <Link to="/registration">Sign Up</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
