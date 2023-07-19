import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface AuthenticatedRouteProps {
   children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
   const user = useAppSelector((state) => state.user);
   const location = useLocation();

   return user.status === 'succeeded' && user.isTokenValid ? (
      <>{children}</>
   ) : (
      <Navigate to="/" state={{ from: location }} />
   );
};
