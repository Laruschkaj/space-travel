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
                        View all planets in our solar system with their current populations and stationed spacecraft.
                        Easily dispatch spacecraft between planets using our interactive selection system.
                    </p>
                    <div className={styles.instructionsBox}>
                        <h3 className={styles.instructionsTitle}>How to Dispatch Spacecraft:</h3>
                        <ol className={styles.instructionsList}>
                            <li>Visit the Planets page</li>
                            <li>Click on a spacecraft to select it (it will be highlighted)</li>
                            <li>Click on any destination planet to dispatch the spacecraft there</li>
                            <li>The spacecraft will transfer people from its current location to the new planet</li>
                        </ol>
                    </div>
                </div>
                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Spacecrafts</h2>
                    <p className={styles.featureText}>
                        Manage your fleet of spacecraft. View detailed information about each vessel,
                        construct new ones to expand your fleet, and decommission old spacecraft when needed.
                    </p>
                    <div className={styles.instructionsBox}>
                        <h3 className={styles.instructionsTitle}>Spacecraft Management:</h3>
                        <ul className={styles.instructionsList}>
                            <li>View all spacecraft with their capacity and current location</li>
                            <li>Click "View Details" to see comprehensive spacecraft information</li>
                            <li>Use "Construct New Spacecraft" to build additional vessels</li>
                            <li>Decommission outdated spacecraft to manage your fleet</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.missionStatement}>
                <h2 className={styles.missionTitle}>Our Mission</h2>
                <p className={styles.missionText}>
                    In a future where Earth's environment has been compromised, humanity has successfully
                    terraformed planets throughout our solar system. As a Space Travel commander, you're
                    responsible for evacuating Earth's population and distributing people across these
                    new habitable worlds using advanced spacecraft technology.
                </p>
            </div>
        </div>
    );
}

export default HomePage;