import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, isFirstTimeUser?: boolean) => void;
  logout: () => void;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  //This will make sure if someone removes the token, the user is not authenticated anymore
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'auth_token' && !event.newValue) {
        setIsAuthenticated(false);
      }
    });
  }, []);

  //If token exists, navigate to authorization page
  const init = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  const login = (token: string, isFirstTimeUser?: boolean) => {
    localStorage.setItem('auth_token', token);
    setIsAuthenticated(true);
    navigate('/dashboard', { state: { isFirstTimeUser } });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return { isAuthenticated, login, logout };
};

export const AuthProvider: React.FC<any> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
