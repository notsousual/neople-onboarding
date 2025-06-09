import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StepPage from './routes/StepPage';
import TopNav from './components/TopNav';

import OnboardingPage from './routes/OnboardingPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TopNav />

        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="/:step" element={<StepPage />} />
          <Route path="/:step/:task" element={<StepPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
