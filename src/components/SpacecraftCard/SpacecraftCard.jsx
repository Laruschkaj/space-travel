// src/components/SpacecraftCard/SpacecraftCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SpacecraftCard.module.css';

/**
 * A reusable component to display a single spacecraft's details.
 * @param {object} props - Component props.
 * @param {object} props.spacecraft - The spacecraft object to display.
 * @param {function} props.onDecommission - Callback function for decommissioning a spacecraft.
 */
function SpacecraftCard({ spacecraft, onDecommission }) {
    const navigate = useNavigate();

    // Handle a click on the decommission button
    const handleDecommissionClick = (event) => {
        // Prevent the parent Link from navigating when the button is clicked
        event.preventDefault();
        event.stopPropagation();
        // Call the parent function to handle decommissioning
        if (onDecommission) {
            onDecommission(spacecraft.id);
        }
    };

    return (
        // The entire card is a link to the detail page
        <Link to={`/spacecraft/${spacecraft.id}`} className={styles.card__link}>
            <div className={styles.card}>
                <div className={styles.card__imageContainer}>
                    {/* Display the spacecraft's picture, or a placeholder if none exists */}
                    <img
                        src={spacecraft.pictureUrl?.[0] || `https://placehold.co/400x300/2c2c2c/e0e0e0?text=${spacecraft.name}`}
                        alt={`Picture of ${spacecraft.name}`}
                        className={styles.card__image}
                    />
                </div>
                <div className={styles.card__content}>
                    <h3 className={styles.card__title}>{spacecraft.name}</h3>
                    <p className={styles.card__detail}>
                        Capacity: <span className={styles.card__detailValue}>{spacecraft.capacity}</span>
                    </p>
                    <p className={styles.card__detail}>
                        Current Location: <span className={styles.card__detailValue}>{spacecraft.currentLocation}</span>
                    </p>
                    <button
                        className={styles.card__decommissionButton}
                        onClick={handleDecommissionClick}
                    >
                        Decommission
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default SpacecraftCard;
