import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <ul className={styles.nav_list}>
                <li className={styles.nav_item}> 
                    <NavLink  to="/" className={({ isActive }) =>
                         isActive ? `${styles.active_nav}` : undefined
                        }>Home 
                    </NavLink>
                </li>
                <li className={styles.nav_item}> 
                    <NavLink to="/login" className={({ isActive }) =>
                         isActive ? `${styles.active_nav}` : undefined
                        }>Login 
                    </NavLink>
                </li>
                <li className={styles.nav_item}> 
                    <NavLink to="/registration" className={({ isActive }) =>
                         isActive ? `${styles.active_nav}` : undefined
                        }>Sign Up 
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
