import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cosmic-navy text-cosmic-silver font-sans selection:bg-cosmic-cyan selection:text-cosmic-navy">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="py-8 text-center text-xs text-cosmic-silver/30 border-t border-white/5 mt-auto">
          <p>© 2025 MegacosmX Ecosystem. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;