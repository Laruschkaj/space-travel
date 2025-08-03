import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PlanetsPage from './pages/PlanetsPage/PlanetsPage';
import SpacecraftsPage from './pages/SpacecraftsPage/SpacecraftsPage';
import SpacecraftDetailPage from './pages/SpacecraftDetailPage/SpacecraftDetailPage';
import ConstructionPage from './pages/ConstructionPage/ConstructionPage';
import styles from './App.module.css';

/**
 * Main application component that defines the navigation and routing.
 */
function App() {
  return (
    <div className={styles.app}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/planets" className={styles.navLink}>Planets</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/spacecrafts" className={styles.navLink}>Spacecrafts</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content area with routing */}
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/spacecrafts" element={<SpacecraftsPage />} />
          <Route path="/spacecrafts/:spacecraftId" element={<SpacecraftDetailPage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          {/* Redirect any undefined routes to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;