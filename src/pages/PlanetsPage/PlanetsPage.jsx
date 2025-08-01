// src/pages/PlanetsPage/PlanetsPage.jsx
import React, { useState, useEffect } from 'react';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import PlanetCard from '../../components/PlanetCard/PlanetCard';
import styles from './PlanetsPage.module.css';

/**
 * Renders a list of planets and allows spacecraft to be dispatched between them.
 * Fetches all planets and spacecraft from the API on load.
 */
function PlanetsPage() {
    const [planets, setPlanets] = useState([]);
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Function to fetch all data from the API
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        // Fetch planets
        const planetsResponse = await SpaceTravelApi.getPlanets();
        if (planetsResponse.isError) {
            console.error("Failed to fetch planets:", planetsResponse.data);
            setError('Failed to load planets.');
            setLoading(false);
            return;
        }

        // Fetch spacecrafts
        const spacecraftsResponse = await SpaceTravelApi.getSpacecrafts();
        if (spacecraftsResponse.isError) {
            console.error("Failed to fetch spacecrafts:", spacecraftsResponse.data);
            setError('Failed to load spacecrafts.');
            setLoading(false);
            return;
        }

        setPlanets(planetsResponse.data);
        setSpacecrafts(spacecraftsResponse.data);
        setLoading(false);
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle spacecraft dispatch
    const handleDispatch = async (spacecraftId, targetPlanetId) => {
        setMessage('');
        setIsError(false);

        // Find the selected spacecraft to get its current location
        const spacecraft = spacecrafts.find(s => s.id === spacecraftId);
        if (spacecraft && spacecraft.currentLocation === Number(targetPlanetId)) {
            setMessage("The spacecraft is already at the target planet.");
            setIsError(true);
            return;
        }

        // Call the API to send the spacecraft
        const response = await SpaceTravelApi.sendSpacecraftToPlanet({
            spacecraftId,
            targetPlanetId: Number(targetPlanetId)
        });

        if (response.isError) {
            console.error("Dispatch failed:", response.data);
            setMessage(response.data || 'Failed to dispatch spacecraft.');
            setIsError(true);
        } else {
            setMessage('Spacecraft dispatched successfully!');
            // Refetch data to update the UI with new locations
            fetchData();
        }
    };

    // Function to clear a success or error message
    const clearMessage = () => {
        setMessage('');
    };

    // Render different UI based on component state
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
            <h1 className={styles.planetsPage__title}>Planets</h1>
            <div className={styles.planetsPage__list}>
                {planets.map((planet) => (
                    <PlanetCard
                        key={planet.id}
                        planet={planet}
                        allPlanets={planets}
                        allSpacecrafts={spacecrafts}
                        onDispatch={handleDispatch}
                    />
                ))}
            </div>

            {/* Custom Message Modal UI */}
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
