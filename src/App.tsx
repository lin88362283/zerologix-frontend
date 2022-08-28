import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import Login from './pages/Login';
import Webinar from './pages/Webinar';
import WebinarDetails from './pages/WebinarDetails';


import './App.css';
import Registered from './pages/Registered';

function App() {
  return (
    <Routes >
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/:id" element={<WebinarDetails />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="*" element={<Navigate to="/webinar" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
