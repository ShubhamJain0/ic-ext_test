import './index.css';

import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './utils/hooks/useAuth';
import RouteRenderer from './RouteRenderer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="710686601290-ghvk9l71a3kvpp5iq7914i113vv1gqc4.apps.googleusercontent.com">
      <AuthProvider>
        <RouteRenderer />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
);
