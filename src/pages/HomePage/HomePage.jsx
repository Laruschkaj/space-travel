import React from 'react';
import styles from './HomePage.module.css';

/**
 * HomePage component to provide an overview of the application.
 */
function HomePage() {
    return (
        <div className={styles.homePage}>
            <h1 className={styles.homePage__title}>Welcome to Space Travel!</h1>
            <p className={styles.homePage__tagline}>
                Your premier destination for managing interplanetary travel and spacecraft.
            </p>
            <div className={styles.homePage__features}>
                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Planets</h2>
                    <p className={styles.featureText}>
                        View all planets in our solar system, their populations, and which spacecraft are stationed on them. Dispatch a spacecraft to a new destination!
                    </p>
                </div>
                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Spacecrafts</h2>
                    <p className={styles.featureText}>
                        Manage your fleet of spacecraft. Construct new vessels, view detailed information, and decommission old ones.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;