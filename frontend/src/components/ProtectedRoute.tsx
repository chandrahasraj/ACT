import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { validateToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setAuthStatus(isValid);
      setIsLoading(false);
    };

    checkAuth();
  }, [validateToken, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return authStatus ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
