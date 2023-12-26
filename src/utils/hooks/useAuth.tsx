import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../apis';
import { UserDetails } from './useGoogleSignIn';

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isUserVerified: false,
  setIsUserVerified: () => {},
  userInfo: { name: '', email: '' },
  login: () => {},
  logout: () => {},
});

type userInfo = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isUserVerified: boolean;
  setIsUserVerified: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: userInfo;
  login: (userDetails: UserDetails, isFirstTimeUser?: boolean) => void;
  logout: () => void;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfo>({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  let emailVerificationToken = '';

  const onSuccess = (responseData: any) => {
    setIsUserVerified(responseData?.payload?.isVerified || false);
    setUserInfo({
      name: responseData?.payload?.name,
      email: responseData?.payload?.email,
    });
    setIsAuthenticated(true);
    //If auth token and refresh token is in payload, save it in local storage
    if (responseData?.payload?.authToken && responseData?.payload?.refreshToken) {
      localStorage.setItem('auth_token', responseData?.payload?.authToken);
      localStorage.setItem('refresh_token', responseData?.payload?.refreshToken);
    }
    //Check if user is verified and if not, redirect to verification page. This also prevents the user from going to the connection config page by manually typing the url
    if (!responseData?.payload?.isVerified) {
      //Check if url contains 'verify_email' parameter and navigate accordingly to dashboard for verification
      if (emailVerificationToken) {
        navigate({ pathname: '/dashboard', search: emailVerificationToken });
      } else {
        navigate('/verify-email');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const onError = (responseData: any) => {
    if (responseData.status === 401) {
      logout();
    }
  };

  useEffect(() => {
    init();
  }, []);

  //This will make sure if someone removes the token, the user is not authenticated anymore
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'auth_token' && !event.newValue) {
        logout();
      }
    });
  }, []);

  //If token exists, navigate to authorization page
  const init = async () => {
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (window.location.search.includes('verify_email')) {
      emailVerificationToken = window.location.search;
    }
    //Navigate to default page
    navigate('/');
    if (token && refreshToken) {
      await getUserDetails(token, refreshToken, onSuccess, onError);
    } else {
      navigate('/login');
    }
  };

  const login = (userDetails: UserDetails, isFirstTimeUser?: boolean) => {
    localStorage.setItem('auth_token', userDetails.authToken);
    localStorage.setItem('refresh_token', userDetails.refreshToken);
    setUserInfo({ name: userDetails.name, email: userDetails.email });
    setIsUserVerified(userDetails.isVerified);
    setIsAuthenticated(true);
    if (isFirstTimeUser || !userDetails.isVerified) {
      navigate('/verify-email', { state: { isFirstTimeUser } });
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserInfo({ name: '', email: '' });
    setIsUserVerified(false);
    navigate('/login');
  };

  return {
    isAuthenticated,
    isUserVerified,
    setIsUserVerified,
    userInfo,
    login,
    logout,
  };
};

export const AuthProvider: React.FC<any> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
