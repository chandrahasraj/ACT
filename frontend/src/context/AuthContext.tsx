import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, role: string) => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

  const inactivityTimeout = 60 * 60 * 1000;

  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
      updateTokenExpiration();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityTime > inactivityTimeout) {
        console.log('User inactive, logging out');
        logout();
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      clearInterval(intervalId);
    };
  }, [lastActivityTime]);

  useEffect(() => {
    const validateAndSetAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
    };

    validateAndSetAuth();
  }, [lastActivityTime]);

  const updateTokenExpiration = () => {
    const newExpirationTime = Date.now() + inactivityTimeout;
    console.log(`Setting new expiration time: ${newExpirationTime}`);
    localStorage.setItem('authTokenExpiration', newExpirationTime.toString());
  };

  const login = (username: string, role: string) => {
    const token = 'some-generated-token';
    const expirationTime = Date.now() + inactivityTimeout;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiration', expirationTime.toString());
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    console.log('Logged in:', { username, role });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    console.log('Logged out');
  };

  const validateToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    const expirationTime = localStorage.getItem('authTokenExpiration');
    
    console.log(`Token: ${token}`);
    console.log(`Expiration Time: ${expirationTime}`);
    
    if (token && expirationTime) {
      const now = Date.now();
      const expiry = parseInt(expirationTime, 10);
      if (now < expiry) {
        return true;
      } else {
        logout();
        return false;
      }
    } else {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
