import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link styling
import styles from './Header.module.css'; // Import CSS module

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <ul className={styles.header__navList}>
                    <li className={styles.header__navItem}>
                        {/* NavLink automatically adds an 'active' class when the route matches */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? `${styles.header__navLink} ${styles['header__navLink--active']}` : styles.header__navLink
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className={styles.header__navItem}>
                        <NavLink
                            to="/spacecrafts"
                            className={({ isActive }) =>
                                isActive ? `${styles.header__navLink} ${styles['header__navLink--active']}` : styles.header__navLink
                            }
                        >
                            Spacecrafts
                        </NavLink>
                    </li>
                    <li className={styles.header__navItem}>
                        <NavLink
                            to="/planets"
                            className={({ isActive }) =>
                                isActive ? `${styles.header__navLink} ${styles['header__navLink--active']}` : styles.header__navLink
                            }
                        >
                            Planets
                        </NavLink>
                    </li>
                    {/* We won't link directly to /spacecraft/:id or /construction from the header,
              as they are typically accessed from other pages. */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
