import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Navbar.module.css';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    logout();
  }

  return (
    <div className={styles.navbar}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.active_nav}` : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${styles.active_nav}` : undefined
            }
          >
            Login
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink
            to="/registration"
            className={({ isActive }) =>
              isActive ? `${styles.active_nav}` : undefined
            }
          >
            Sign Up
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
