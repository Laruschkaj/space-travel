import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
      <Header />

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

      <Footer />
    </div>
  );
}

export default App;
