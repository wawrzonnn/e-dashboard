import React, { PropsWithChildren } from 'react';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { Leads } from './views/Leads';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from 'components/DashboardLayout/DashboardLayout';
import { Container } from 'components/Container/Container';

function App() {
   return (
      <Container>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route
               path="/dashboard"
               element={
                  <DashboardLayout>
                     <Dashboard />
                  </DashboardLayout>
               }
            />
            <Route
               path="/leads"
               element={
                  <DashboardLayout>
                     <Leads />
                  </DashboardLayout>
               }
            />
         </Routes>
      </Container>
   );
}

export default App;
