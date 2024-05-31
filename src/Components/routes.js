// src/MainRoutes.js
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Appointment from './pages/Appointment';
import Layout from './layout';
import Profile from './pages/Profile';
import Bill from './pages/Bill';
import IPDeposit from './pages/IPDeposit';
import Recieipt from './pages/Recieipt';
import Prescription from './pages/Prescription';
import Login from './pages/Login';

function MainRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      ) : (
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/ipdeposit" element={<IPDeposit />} />
          <Route path="/recieipt" element={<Recieipt />} />
          <Route path="/prescription" element={<Prescription />} />
        </Route>
      )}
    </Routes>
  );
}

export default MainRoutes;
