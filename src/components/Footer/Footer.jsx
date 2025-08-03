// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Space Travel Inc.</p>
        </footer>
    );
}

export default Footer;
