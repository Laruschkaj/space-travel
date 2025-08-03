import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import styles from './SpacecraftDetailPage.module.css';

/**
 * Renders the detail page for a single spacecraft.
 * Fetches the specific spacecraft data based on the URL parameter.
 */
const SpacecraftDetailPage = () => {
    const { spacecraftId } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get planet name by ID
    const getPlanetName = (planetId) => {
        const planet = planets.find(p => p.id === planetId);
        return planet ? planet.name : `Planet ${planetId}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch spacecraft details
                const spacecraftResponse = await SpaceTravelApi.getSpacecraftById({ id: spacecraftId });
                if (spacecraftResponse.isError) {
                    throw new Error(spacecraftResponse.data || 'Failed to load spacecraft details.');
                }

                // Fetch planets for location name
                const planetsResponse = await SpaceTravelApi.getPlanets();
                if (planetsResponse.isError) {
                    throw new Error(planetsResponse.data || 'Failed to load planets.');
                }

                setSpacecraft(spacecraftResponse.data);
                setPlanets(planetsResponse.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [spacecraftId]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading spacecraft details...</p>
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

    if (!spacecraft) {
        return (
            <div className={styles.notFoundContainer}>
                <h1>Spacecraft not found.</h1>
                <Link to="/spacecrafts" className={styles.backButton}>
                    Back to Spacecrafts
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.detailPage}>
            <div className={styles.detailCard}>
                <h1 className={styles.detailTitle}>{spacecraft.name}</h1>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Capacity:</span>
                        <span className={styles.detailValue}>{spacecraft.capacity.toLocaleString()}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Location:</span>
                        <span className={styles.detailValue}>{getPlanetName(spacecraft.currentLocation)}</span>
                    </div>
                </div>
                <div className={styles.detailDescription}>
                    <h2 className={styles.descriptionTitle}>Description</h2>
                    <p className={styles.descriptionText}>{spacecraft.description}</p>
                </div>
                <Link to="/spacecrafts" className={styles.backButton}>
                    Back to All Spacecrafts
                </Link>
            </div>
        </div>
    );
};

export default SpacecraftDetailPage;