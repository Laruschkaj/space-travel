import React, { useState, useEffect } from 'react';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import styles from './PlanetsPage.module.css';

/**
 * Interactive Planets Page with clickable spacecraft and planet selection
 */
function PlanetsPage() {
    const [planets, setPlanets] = useState([]);
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [planetsResponse, spacecraftsResponse] = await Promise.all([
                SpaceTravelApi.getPlanets(),
                SpaceTravelApi.getSpacecrafts()
            ]);

            if (planetsResponse.isError) {
                throw new Error(planetsResponse.data || 'Failed to load planets.');
            }
            if (spacecraftsResponse.isError) {
                throw new Error(spacecraftsResponse.data || 'Failed to load spacecrafts.');
            }

            setPlanets(planetsResponse.data);
            setSpacecrafts(spacecraftsResponse.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSpacecraftSelect = (spacecraft) => {
        setSelectedSpacecraft(spacecraft);
        setMessage('');
        setIsError(false);
    };

    const handlePlanetSelect = async (targetPlanet) => {
        if (!selectedSpacecraft) {
            setMessage('Please select a spacecraft first.');
            setIsError(true);
            return;
        }

        if (selectedSpacecraft.currentLocation === targetPlanet.id) {
            setMessage('The spacecraft is already at this planet.');
            setIsError(true);
            return;
        }

        try {
            const response = await SpaceTravelApi.sendSpacecraftToPlanet({
                spacecraftId: selectedSpacecraft.id,
                targetPlanetId: targetPlanet.id
            });

            if (response.isError) {
                throw new Error(response.data || 'Failed to dispatch spacecraft.');
            }

            setMessage(`${selectedSpacecraft.name} successfully dispatched to ${targetPlanet.name}!`);
            setSelectedSpacecraft(null);
            fetchData();
        } catch (err) {
            console.error("Dispatch failed:", err);
            setMessage(err.message || 'Failed to dispatch spacecraft.');
            setIsError(true);
        }
    };

    const clearMessage = () => {
        setMessage('');
    };

    const clearSelection = () => {
        setSelectedSpacecraft(null);
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading planets and spacecraft...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h1 className={styles.errorTitle}>Error</h1>
                <p className={styles.errorMessage}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.planetsPage}>
            <h1 className={styles.planetsPage__title}>Planets & Spacecraft Dispatch</h1>

            {/* Instructions */}
            <div className={styles.instructions}>
                <p>
                    <strong>How to dispatch:</strong>
                    {selectedSpacecraft ? (
                        <>
                            Click on a planet to send <strong>{selectedSpacecraft.name}</strong> there.
                            <button onClick={clearSelection} className={styles.clearButton}>Clear Selection</button>
                        </>
                    ) : (
                        ' Select a spacecraft, then click on a destination planet.'
                    )}
                </p>
            </div>

            <div className={styles.planetsGrid}>
                {planets.map((planet) => {
                    const stationedSpacecrafts = spacecrafts.filter(sc => sc.currentLocation === planet.id);
                    const isClickable = selectedSpacecraft && selectedSpacecraft.currentLocation !== planet.id;

                    return (
                        <div
                            key={planet.id}
                            className={`${styles.planetCard} ${isClickable ? styles.planetClickable : ''}`}
                            onClick={() => isClickable && handlePlanetSelect(planet)}
                        >
                            <div className={styles.planetImageContainer}>
                                <img
                                    src={planet.pictureUrl}
                                    alt={planet.name}
                                    className={styles.planetImage}
                                />
                                <div className={styles.planetOverlay}>
                                    <h2 className={styles.planetName}>{planet.name}</h2>
                                    <p className={styles.planetPopulation}>
                                        Population: {planet.currentPopulation.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {stationedSpacecrafts.length > 0 && (
                                <div className={styles.spacecraftsSection}>
                                    <h4 className={styles.spacecraftsTitle}>Stationed Spacecraft:</h4>
                                    <div className={styles.spacecraftsList}>
                                        {stationedSpacecrafts.map((spacecraft) => (
                                            <div
                                                key={spacecraft.id}
                                                className={`${styles.spacecraftItem} ${selectedSpacecraft?.id === spacecraft.id ? styles.selectedSpacecraft : ''
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSpacecraftSelect(spacecraft);
                                                }}
                                            >
                                                <span className={styles.spacecraftName}>{spacecraft.name}</span>
                                                <span className={styles.spacecraftCapacity}>
                                                    ({spacecraft.capacity.toLocaleString()})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {stationedSpacecrafts.length === 0 && (
                                <div className={styles.noSpacecrafts}>
                                    <p>No spacecraft stationed</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Message Modal */}
            {message && (
                <div className={styles.messageOverlay}>
                    <div className={`${styles.messageModal} ${isError ? styles.errorModal : styles.successModal}`}>
                        <p className={styles.messageText}>{message}</p>
                        <button onClick={clearMessage} className={styles.messageButton}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlanetsPage;