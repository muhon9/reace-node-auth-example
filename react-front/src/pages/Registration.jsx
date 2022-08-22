import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import { AuthContext } from '../context/AuthContext';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { logout, loading, error, setError, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    if (user) {
      navigate('/');
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Confirm Password Doesn't match");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_ROOT}/auth/register`, {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log('response', response);
        setError('');
      })
      .catch((err) => {
        console.log('Error', err);
        setError(err.response.data?.message);
      });
  }

  return (
    <div>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <div className={styles.form_title}>Sign Up</div>
        <div className={styles.form_fields}>
          <div className={styles.form_field}>
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          </div>
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
          <div className={styles.form_field}>
            <label htmlFor="confirm_password">
              Confirm Pass:
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </label>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className={styles.button}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div className={styles.signup_call}>
        Already have account?
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Registration;
