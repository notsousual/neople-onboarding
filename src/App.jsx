import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StepPage from './routes/StepPage';
import TopNav from './components/TopNav';

import Onboarding from './routes/Onboarding';

import './App.css';

const steps = ['onboarding', 'training', 'answer-templates', 'knowledge'];

function App() {
  return (
    <Router>
      <div className="App">
        <TopNav />

        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="/:step" element={<StepPage />} />
          <Route path="/:step/:task" element={<StepPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
