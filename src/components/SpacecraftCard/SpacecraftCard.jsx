import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SpacecraftCard.module.css';

/**
 * A card component to display a single spacecraft's summary.
 * It includes a link to the detail page and a decommission button.
 * @param {Object} props
 * @param {Object} props.spacecraft - The spacecraft object to display.
 * @param {Array} props.planets - Array of all planets to get planet names.
 * @param {Function} props.onDecommission - The function to call when the decommission button is clicked.
 */
function SpacecraftCard({ spacecraft, planets, onDecommission }) {
    // Get planet name by ID
    const getPlanetName = (planetId) => {
        const planet = planets?.find(p => p.id === planetId);
        return planet ? planet.name : `Planet ${planetId}`;
    };

    return (
        <div className={styles.spacecraftCard}>
            <div className={styles.cardContent}>
                <h3 className={styles.spacecraftName}>{spacecraft.name}</h3>
                <p className={styles.spacecraftCapacity}>
                    Capacity: {spacecraft.capacity.toLocaleString()}
                </p>
                <p className={styles.spacecraftLocation}>
                    Location: {getPlanetName(spacecraft.currentLocation)}
                </p>
            </div>
            <div className={styles.cardActions}>
                <Link to={`/spacecrafts/${spacecraft.id}`} className={styles.detailsButton}>
                    View Details
                </Link>
                <button
                    onClick={() => onDecommission(spacecraft.id)}
                    className={styles.decommissionButton}
                >
                    Decommission
                </button>
            </div>
        </div>
    );
}

export default SpacecraftCard;