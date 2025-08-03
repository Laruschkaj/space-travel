import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import styles from './ConstructionPage.module.css';

/**
 * A page with a form to create a new spacecraft.
 */
function ConstructionPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        // Input validation
        if (!name.trim() || !capacity.trim() || !description.trim()) {
            setMessage('All fields are required.');
            setIsError(true);
            setLoading(false);
            return;
        }

        const capacityNum = parseInt(capacity, 10);
        if (isNaN(capacityNum) || capacityNum <= 0) {
            setMessage('Capacity must be a positive number.');
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            const response = await SpaceTravelApi.buildSpacecraft({
                name,
                capacity: capacityNum,
                description,
            });

            if (response.isError) {
                throw new Error(response.data || 'Failed to build spacecraft.');
            }

            setMessage('Spacecraft built successfully!');
            setTimeout(() => {
                navigate('/spacecrafts');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setMessage(err.message);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const clearMessage = () => {
        setMessage('');
    };

    return (
        <div className={styles.constructionPage}>
            <h1 className={styles.constructionTitle}>Construct New Spacecraft</h1>
            <form className={styles.constructionForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.formInput}
                        disabled={loading}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="capacity" className={styles.formLabel}>Capacity</label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className={styles.formInput}
                        disabled={loading}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.formLabel}>Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.formTextarea}
                        rows="5"
                        disabled={loading}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Building...' : 'Build Spacecraft'}
                </button>
            </form>

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

export default ConstructionPage;
