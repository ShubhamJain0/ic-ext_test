import React, { useContext } from 'react';
import { AuthContext } from '../utils/hooks/useAuth';

export default function NotFound() {
  const { isAuthenticated } = useContext(AuthContext);

  const handleHome = () => {
    if (isAuthenticated) {
      window.location.href = '/cms-collections';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>Page Not Found</h1>
        <button onClick={() => handleHome()}>Back to home</button>
      </div>
    </div>
  );
}
