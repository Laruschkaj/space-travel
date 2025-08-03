import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SpacecraftsPage.module.css';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import SpacecraftCard from '../../components/SpacecraftCard/SpacecraftCard';

/**
 * Renders the page that displays a list of all spacecraft.
 */
function SpacecraftsPage() {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [decommissioningId, setDecommissioningId] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [spacecraftsResponse, planetsResponse] = await Promise.all([
                SpaceTravelApi.getSpacecrafts(),
                SpaceTravelApi.getPlanets()
            ]);

            if (spacecraftsResponse.isError) {
                throw new Error(spacecraftsResponse.data || 'Failed to load spacecrafts.');
            }
            if (planetsResponse.isError) {
                throw new Error(planetsResponse.data || 'Failed to load planets.');
            }

            setSpacecrafts(spacecraftsResponse.data);
            setPlanets(planetsResponse.data);
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

    const handleDecommission = (id) => {
        setDecommissioningId(id);
        setShowConfirm(true);
    };

    const confirmDecommission = async () => {
        setShowConfirm(false);
        setMessage('');
        if (decommissioningId) {
            try {
                const response = await SpaceTravelApi.destroySpacecraftById({ id: decommissioningId });
                if (response.isError) {
                    throw new Error(response.data || 'Failed to decommission spacecraft.');
                }
                fetchData();
                setMessage('Spacecraft decommissioned successfully!');
            } catch (err) {
                console.error("Failed to decommission spacecraft:", err);
                setMessage(err.message || 'Failed to decommission spacecraft.');
            } finally {
                setDecommissioningId(null);
            }
        }
    };

    const cancelDecommission = () => {
        setShowConfirm(false);
        setDecommissioningId(null);
    };

    const clearMessage = () => {
        setMessage('');
    };

    const handleConstruction = () => {
        navigate('/construction');
    };

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
                            planets={planets}
                            onDecommission={handleDecommission}
                        />
                    ))
                ) : (
                    <p className={styles.spacecraftsPage__noData}>No spacecraft found. Time to build one!</p>
                )}
            </div>

            {/* Confirmation Modal */}
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

            {/* Message Modal */}
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