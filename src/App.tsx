import React from 'react';
import { Login } from './views/Login/Login';
import { Dashboard } from './views/Dashboard/Dashboard';
import { Leads } from './views/Leads/Leads';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from 'components/DashboardLayout/DashboardLayout';
import { AuthenticatedRoute } from 'components/AuthenticatedRoute/AuthenticatedRoute';

function App() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route
            path="/dashboard"
            element={
               <AuthenticatedRoute>
                  <DashboardLayout>
                     <Dashboard />
                  </DashboardLayout>
               </AuthenticatedRoute>
            }
         />
         <Route
            path="/leads"
            element={
               <AuthenticatedRoute>
                  <DashboardLayout>
                     <Leads />
                  </DashboardLayout>
               </AuthenticatedRoute>
            }
         />
      </Routes>
   );
}

export default App;
