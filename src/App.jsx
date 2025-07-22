import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import AnalyzePage from '@/pages/AnalyzePage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="analyze" element={<AnalyzePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;