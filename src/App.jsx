import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TierList from './pages/TierList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tier-list" element={<TierList />}/>
      </Routes>
    </Router>
  );
}

export default App;
