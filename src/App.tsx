import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import Login from './pages/Login';
import Webinar from './pages/Webinar';

import './App.css';

function App() {
  return (
    <Routes >
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="*" element={<Navigate to="/webinar" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
