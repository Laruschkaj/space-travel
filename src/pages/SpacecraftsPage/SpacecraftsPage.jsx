// src/pages/SpacecraftsPage/SpacecraftsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SpacecraftsPage.module.css';

// Import the API service using the correct default import
import SpaceTravelApi from '../../services/SpaceTravelApi';
import SpacecraftCard from '../../components/SpacecraftCard/SpacecraftCard';

/**
 * Renders the page that displays a list of all spacecraft.
 * It fetches data from the API and handles loading, error, and deletion states.
 */
function SpacecraftsPage() {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [decommissioningId, setDecommissioningId] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Function to fetch spacecraft data from the API
    const fetchSpacecrafts = async () => {
        setLoading(true);
        setError(null);
        const response = await SpaceTravelApi.getSpacecrafts();
        if (response.isError) {
            console.error("Failed to fetch spacecrafts:", response.data);
            setError(response.data || 'Failed to load spacecrafts.');
        } else {
            setSpacecrafts(response.data);
        }
        setLoading(false);
    };

    // useEffect hook to fetch data on component mount
    useEffect(() => {
        fetchSpacecrafts();
    }, []); // Empty dependency array ensures this runs only once

    // Function to handle the decommissioning of a spacecraft
    const handleDecommission = (id) => {
        // Set state to show the confirmation modal
        setDecommissioningId(id);
        setShowConfirm(true);
    };

    // Function to confirm and proceed with decommissioning
    const confirmDecommission = async () => {
        if (decommissioningId) {
            setShowConfirm(false);
            const response = await SpaceTravelApi.destroySpacecraftById({ id: decommissioningId });
            if (response.isError) {
                console.error("Failed to decommission spacecraft:", response.data);
                setMessage(response.data || 'Failed to decommission spacecraft.');
            } else {
                // After successful deletion, refetch the list to update the UI
                fetchSpacecrafts();
                setMessage('Spacecraft decommissioned successfully!');
            }
        }
    };

    // Function to cancel decommissioning
    const cancelDecommission = () => {
        setShowConfirm(false);
        setDecommissioningId(null);
    };

    // Function to clear a success or error message
    const clearMessage = () => {
        setMessage('');
    };

    // Function to navigate to the construction page
    const handleConstruction = () => {
        navigate('/construction');
    };

    // Render different UI based on the component's state
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading spacecrafts...</p>
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
        <div className={styles.spacecraftsPage}>
            <div className={styles.spacecraftsPage__header}>
                <h1 className={styles.spacecraftsPage__title}>All Spacecrafts</h1>
                <button
                    className={styles.spacecraftsPage__button}
                    onClick={handleConstruction}
                >
                    Construct New Spacecraft
                </button>
            </div>
            <div className={styles.spacecraftsPage__list}>
                {spacecrafts.length > 0 ? (
                    spacecrafts.map((spacecraft) => (
                        <SpacecraftCard
                            key={spacecraft.id}
                            spacecraft={spacecraft}
                            onDecommission={handleDecommission}
                        />
                    ))
                ) : (
                    <p className={styles.spacecraftsPage__noData}>No spacecraft found. Time to build one!</p>
                )}
            </div>

            {/* Custom Confirmation Modal UI */}
            {showConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p className={styles.modalText}>Are you sure you want to decommission this spacecraft?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={confirmDecommission} className={styles.confirmButton}>Yes, Decommission</button>
                            <button onClick={cancelDecommission} className={styles.cancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Message/Alert UI */}
            {message && (
                <div className={styles.messageOverlay}>
                    <div className={styles.messageModal}>
                        <p className={styles.messageText}>{message}</p>
                        <button onClick={clearMessage} className={styles.messageButton}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpacecraftsPage;
