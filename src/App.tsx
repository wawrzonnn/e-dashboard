import React from 'react';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { Leads } from './views/Leads';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from 'components/DashboardLayout/DashboardLayout';
import { Container } from 'components/Container/Container';
import { AuthenticatedRoute } from 'components/AuthenticatedRoute/AuthenticatedRoute';

function App() {
   return (
      <Container>
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
      </Container>
   );
}

export default App;
