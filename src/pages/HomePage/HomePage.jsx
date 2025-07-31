// src/pages/HomePage/HomePage.jsx
import React from 'react';
import styles from './HomePage.module.css'; // Import CSS module

function HomePage() {
    return (
        <div className={styles.homePage}>
            <h1 className={styles.homePage__title}>Welcome to Space Travel!</h1>
            <p className={styles.homePage__description}>
                In a future where Earth is no longer habitable, you, as a commander, are tasked with the monumental mission of evacuating humanity to new homes across the solar system.
            </p>
            <h2 className={styles.homePage__subtitle}>Application Functionality:</h2>
            <ul className={styles.homePage__featuresList}>
                <li className={styles.homePage__featureItem}>
                    <strong>Spacecrafts Page:</strong> View all available spacecraft, build new ones, and decommission old ones.
                </li>
                <li className={styles.homePage__featureItem}>
                    <strong>Spacecraft Details:</strong> Get comprehensive information about any specific spacecraft.
                </li>
                <li className={styles.homePage__featureItem}>
                    <strong>Planets Page:</strong> See all habitable planets, the spacecraft currently stationed there, and dispatch spacecraft between planets.
                </li>
                <li className={styles.homePage__featureItem}>
                    <strong>Interplanetary Dispatches:</strong> Strategically move spacecraft to new planets, transferring populations.
                </li>
            </ul>
            <p className={styles.homePage__callToAction}>
                Embark on this vital mission and secure humanity's future among the stars!
            </p>
        </div>
    );
}

export default HomePage;
