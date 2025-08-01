// src/pages/ConstructionPage/ConstructionPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../../services/SpaceTravelApi';
import styles from './ConstructionPage.module.css';

/**
 * Renders a form for building a new spacecraft.
 * Handles form state, submission, and validation.
 */
function ConstructionPage() {
    const [formState, setFormState] = useState({
        name: '',
        capacity: '',
        description: '',
    });
    // State to track validation errors for each field
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    // Derived state to check if all fields are filled
    const [isFormComplete, setIsFormComplete] = useState(false);

    const navigate = useNavigate();

    // useEffect to check if the form is complete and enable the button
    useEffect(() => {
        const { name, capacity, description } = formState;
        if (name.trim() !== '' && capacity.trim() !== '' && description.trim() !== '') {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [formState]); // Re-run whenever formState changes

    // Handle changes to form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear the error for the field being edited
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);
        setFormErrors({});

        // Client-side validation: Check for empty fields
        let errors = {};
        if (!formState.name.trim()) errors.name = 'Name is required.';
        if (!formState.capacity.trim()) errors.capacity = 'Capacity is required.';
        if (!formState.description.trim()) errors.description = 'Description is required.';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            setMessage('Please fill in all required fields.');
            setIsError(true);
            return;
        }

        // Call the API to build the new spacecraft
        const response = await SpaceTravelApi.buildSpacecraft({
            name: formState.name,
            capacity: Number(formState.capacity),
            description: formState.description,
        });

        if (response.isError) {
            console.error('Failed to build spacecraft:', response.data);
            setMessage(response.data || 'Failed to construct spacecraft.');
            setIsError(true);
        } else {
            setMessage('Spacecraft built successfully!');
            setIsError(false);
            // Clear the form fields after successful submission
            setFormState({
                name: '',
                capacity: '',
                description: '',
            });
            // Optionally, navigate back to the spacecrafts list after a delay
            setTimeout(() => navigate('/spacecrafts'), 2000);
        }

        setLoading(false);
    };

    // Function to clear a success or error message
    const clearMessage = () => {
        setMessage('');
        setIsError(false);
    };

    return (
        <div className={styles.constructionPage}>
            <h1 className={styles.constructionPage__title}>Construct a New Spacecraft</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form__group}>
                    <label htmlFor="name" className={styles.form__label}>Spacecraft Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`${styles.form__input} ${formErrors.name ? styles.errorBorder : ''}`}
                        placeholder="e.g., Star-Jumper 3000"
                    />
                </div>
                <div className={styles.form__group}>
                    <label htmlFor="capacity" className={styles.form__label}>Passenger Capacity</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formState.capacity}
                        onChange={handleChange}
                        className={`${styles.form__input} ${formErrors.capacity ? styles.errorBorder : ''}`}
                        min="1"
                        placeholder="e.g., 500"
                    />
                </div>
                <div className={styles.form__group}>
                    <label htmlFor="description" className={styles.form__label}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        className={`${styles.form__textarea} ${formErrors.description ? styles.errorBorder : ''}`}
                        rows="5"
                        placeholder="Describe the spacecraft's features..."
                    />
                </div>
                <button
                    type="submit"
                    className={styles.form__button}
                    disabled={!isFormComplete || loading} // Disable button if form is not complete or loading
                >
                    {loading ? 'Building...' : 'Build Spacecraft'}
                </button>
            </form>

            {/* More visible message modal */}
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
