import React from 'react';
import styles from './ConstructionPage.module.css'; // Import CSS module

function ConstructionPage() {
    return (
        <div className={styles.constructionPage}>
            <h1>Construction Page</h1>
            <p>This page will display all spacecraft.</p>
        </div>
    );
}

export default ConstructionPage;