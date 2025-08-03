import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import styles from './SpacecraftDetailPage.module.css';

/**
 * Renders the detail page for a single spacecraft.
 * Fetches the specific spacecraft data based on the URL parameter.
 */
const SpacecraftDetailPage = () => {
    // Get the `spacecraftId` from the URL using the useParams hook.
    const { spacecraftId } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect to fetch data on component mount
    useEffect(() => {
        const fetchSpacecraft = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await SpaceTravelApi.getSpacecraftById({ id: spacecraftId });
                if (response.isError) {
                    throw new Error(response.data || 'Failed to load spacecraft details.');
                }
                setSpacecraft(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch spacecraft:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSpacecraft();
    }, [spacecraftId]); // Rerun effect if the ID changes

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

    // If no spacecraft is found after loading, display a not found message.
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

    // If the spacecraft is found, display its details.
    return (
        <div className={styles.detailPage}>
            <div className={styles.detailCard}>
                <h1 className={styles.detailTitle}>{spacecraft.name}</h1>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ID:</span>
                    <span className={styles.detailValue}>{spacecraft.id}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Capacity:</span>
                    <span className={styles.detailValue}>{spacecraft.capacity.toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Current Location:</span>
                    <span className={styles.detailValue}>Planet {spacecraft.currentLocation}</span>
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