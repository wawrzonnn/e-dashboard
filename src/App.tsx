import React from 'react';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { Leads } from './views/Leads';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
