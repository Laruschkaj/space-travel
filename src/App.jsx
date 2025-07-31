import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Header from './components/Header/Header'; // Import Header component

// Import all your page components
import HomePage from './pages/HomePage/HomePage';
import SpacecraftsPage from './pages/SpacecraftsPage/SpacecraftsPage';
import SpacecraftPage from './pages/SpacecraftPage/SpacecraftPage';
import ConstructionPage from './pages/ConstructionPage/ConstructionPage';
import PlanetsPage from './pages/PlanetsPage/PlanetsPage';

import './App.module.css'; // Global App styles (if any)

function App() {
  return (
    <div className="App">
      {/* The Header will be visible on all pages */}
      <Header />

      {/* Define your routes here */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Spacecrafts List Page */}
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />

        {/* Individual Spacecraft Detail Page (uses a dynamic ID parameter) */}
        <Route path="/spacecraft/:id" element={<SpacecraftPage />} />

        {/* Spacecraft Construction Page */}
        <Route path="/construction" element={<ConstructionPage />} />

        {/* Planets List Page */}
        <Route path="/planets" element={<PlanetsPage />} />

        {/* Redirect unmatched routes to the Home Page */}
        {/* The '*' path matches any URL not matched by previous routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
