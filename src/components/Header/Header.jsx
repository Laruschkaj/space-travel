import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <nav className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>Space Travel</span>
                    </div>
                    <div className={styles.navLinks}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            🏠 Home
                        </NavLink>
                        <NavLink
                            to="/spacecrafts"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            🚀 Spacecrafts
                        </NavLink>
                        <NavLink
                            to="/planets"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            🌍 Planets
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;