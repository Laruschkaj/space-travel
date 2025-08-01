// src/components/PlanetCard/PlanetCard.jsx
import React, { useState } from 'react';
import styles from './PlanetCard.module.css';

/**
 * A reusable card component to display a single planet's information
 * and controls for dispatching spacecraft.
 * @param {object} props
 * @param {object} props.planet - The planet object to display.
 * @param {Array<object>} props.allPlanets - A list of all planets for the dropdown.
 * @param {Array<object>} props.allSpacecrafts - A list of all available spacecraft.
 * @param {function} props.onDispatch - The function to call when dispatching a spacecraft.
 */
function PlanetCard({ planet, allPlanets, allSpacecrafts, onDispatch }) {
    // Filter spacecrafts to find those currently at this planet
    const spacecraftsAtThisPlanet = allSpacecrafts.filter(s => s.currentLocation === planet.id);
    const otherSpacecrafts = allSpacecrafts.filter(s => s.currentLocation !== planet.id);
    const destinationPlanets = allPlanets.filter(p => p.id !== planet.id);

    const [selectedSpacecraft, setSelectedSpacecraft] = useState('');
    const [targetPlanet, setTargetPlanet] = useState('');

    // Handle form submission for dispatch
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedSpacecraft && targetPlanet) {
            onDispatch(selectedSpacecraft, targetPlanet);
            // Reset form fields after dispatch
            setSelectedSpacecraft('');
            setTargetPlanet('');
        }
    };

    return (
        <div className={styles.planetCard}>
            <img src={planet.pictureUrl} alt={`Image of ${planet.name}`} className={styles.planetCard__image} />
            <div className={styles.planetCard__content}>
                <h2 className={styles.planetCard__title}>{planet.name}</h2>
                <p className={styles.planetCard__population}>Population: {planet.currentPopulation.toLocaleString()}</p>

                <div className={styles.planetCard__spacecrafts}>
                    <h3 className={styles.planetCard__subTitle}>Stationed Spacecraft</h3>
                    {spacecraftsAtThisPlanet.length > 0 ? (
                        <ul>
                            {spacecraftsAtThisPlanet.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No spacecraft stationed here.</p>
                    )}
                </div>

                <form onSubmit={handleFormSubmit} className={styles.dispatchForm}>
                    <h3 className={styles.planetCard__subTitle}>Dispatch Spacecraft Here</h3>

                    <div className={styles.formGroup}>
                        <label htmlFor="spacecraft-select">Select Spacecraft:</label>
                        <select
                            id="spacecraft-select"
                            value={selectedSpacecraft}
                            onChange={(e) => setSelectedSpacecraft(e.target.value)}
                            className={styles.formSelect}
                            required
                        >
                            <option value="">-- Choose a Spacecraft --</option>
                            {otherSpacecrafts.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="planet-select">Select Destination:</label>
                        <select
                            id="planet-select"
                            value={targetPlanet}
                            onChange={(e) => setTargetPlanet(e.target.value)}
                            className={styles.formSelect}
                            required
                        >
                            <option value="">-- Choose a Planet --</option>
                            {destinationPlanets.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={styles.dispatchButton}
                        disabled={!selectedSpacecraft || !targetPlanet}
                    >
                        Dispatch
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PlanetCard;
