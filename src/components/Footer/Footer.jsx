import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <p className={styles.footerText}>
                        © {new Date().getFullYear()} Space Travel Inc. - Exploring the cosmos, one planet at a time.
                    </p>
                </div>
                <div className={styles.footerSection}>
                    <div className={styles.footerLinks}>
                        <a href="#" className={styles.footerLink}>Privacy Policy</a>
                        <a href="#" className={styles.footerLink}>Terms of Service</a>
                        <a href="#" className={styles.footerLink}>Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
