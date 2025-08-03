

/* --- Components --- */
// src/components/PlanetCard/PlanetCard.jsx
import React, { useState } from 'react';
import styles from './PlanetCard.module.css';

/**
 * PlanetCard component to display a planet's information and allow spacecraft dispatch.
 * @param {Object} props
 * @param {Object} props.planet - The planet object to display.
 * @param {Array} props.allSpacecrafts - List of all spacecrafts.
 * @param {Function} props.onDispatch - Function to handle spacecraft dispatch.
 */
function PlanetCard({ planet, allSpacecrafts, onDispatch }) {
    const [selectedSpacecraftId, setSelectedSpacecraftId] = useState('');

    // Filter spacecrafts that are not currently at this planet
    const availableSpacecrafts = allSpacecrafts.filter(
        (sc) => sc.currentLocation !== planet.id
    );

    // Filter spacecrafts that are currently at this planet
    const stationedSpacecrafts = allSpacecrafts.filter(
        (sc) => sc.currentLocation === planet.id
    );

    // Handle form submission for dispatching
    const handleDispatchSubmit = (e) => {
        e.preventDefault();
        if (selectedSpacecraftId) {
            onDispatch(selectedSpacecraftId, planet.id);
            setSelectedSpacecraftId('');
        }
    };

    return (
        <div className={styles.planetCard}>
            <img
                src={planet.pictureUrl}
                alt={planet.name}
                className={styles.planetImage}
            />
            <div className={styles.planetInfo}>
                <h2 className={styles.planetName}>{planet.name}</h2>
                <p className={styles.planetPopulation}>
                    Population: {planet.currentPopulation.toLocaleString()}
                </p>
                {stationedSpacecrafts.length > 0 && (
                    <div className={styles.stationedSpacecrafts}>
                        <h4 className={styles.stationedTitle}>Stationed Spacecraft:</h4>
                        <ul className={styles.stationedList}>
                            {stationedSpacecrafts.map((sc) => (
                                <li key={sc.id} className={styles.stationedItem}>
                                    {sc.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.dispatchSection}>
                <h4 className={styles.dispatchTitle}>Dispatch Spacecraft</h4>
                {availableSpacecrafts.length > 0 ? (
                    <form onSubmit={handleDispatchSubmit}>
                        <select
                            value={selectedSpacecraftId}
                            onChange={(e) => setSelectedSpacecraftId(e.target.value)}
                            className={styles.dispatchSelect}
                        >
                            <option value="">Select a Spacecraft</option>
                            {availableSpacecrafts.map((sc) => (
                                <option key={sc.id} value={sc.id}>
                                    {sc.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className={styles.dispatchButton}
                            disabled={!selectedSpacecraftId}
                        >
                            Dispatch
                        </button>
                    </form>
                ) : (
                    <p className={styles.noSpacecraftMessage}>No spacecrafts available to dispatch here.</p>
                )}
            </div>
        </div>
    );
}

export default PlanetCard;