import React, { useState } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { googleSignIn } from '../apis';

interface GoogleSignInProps {
  userDetails: UserDetails | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

type UserDetails = {
  name: string;
  email: string;
  authToken: string;
  refreshToken: string;
};

export const useGoogleSignIn = (): GoogleSignInProps => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const onLoginSuccess = (responseData: any) => {
    setIsAuthenticated(true);
    setUserDetails(responseData?.payload);
  };

  const onLoginError = (error: any) => {
    setIsAuthenticated(false);
    // console.log('Error', error);
  };

  const login = useGoogleLogin({
    onSuccess: ({ code }) => {
      googleSignIn(code, onLoginSuccess, onLoginError);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
    flow: 'auth-code',
  });

  const logout = () => {
    googleLogout();
    setIsAuthenticated(false);
  };

  return { userDetails, isAuthenticated, login, logout };
};
