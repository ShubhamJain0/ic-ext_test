import AuthorizationStatus from '../pages/AuthorizationStatus';
import Authorize from '../pages/Authorize';
import CMSCollections from '../pages/CMSCollections';
import Compression from '../pages/Compression';
import { ConnectedSites } from '../pages/ConnectedSites';
import Dashboard from '../pages/Dashboard';
import VerifyEmail from '../pages/EmailVerify';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Result from '../pages/Result';
import Singup from '../pages/Singup';
import { TaskHistory } from '../pages/TaskHistory';
import Welcome from '../pages/Welcome';

//use js closures to merge all routes, leverage useRoutes() hooks to create split routes using JS
export const RootRoutes = [
  /* {
    path: '/',
    element: <AppRouter />,
    errorElement: <ErrorPage />,
  }, */
  {
    path: '/',
    element: Welcome,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: Singup,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: Login,
    errorElement: <ErrorPage />,
  },
];

export const AuthenticatedRootRoutes = [
  {
    path: '/',
    element: Welcome,
    errorElement: <ErrorPage />,
  },
  {
    path: '/authorize',
    element: Authorize,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth-status',
    element: AuthorizationStatus,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cms-collections',
    element: CMSCollections,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    errorElement: <ErrorPage />,
  },
  {
    path: '/select-website',
    element: Compression,
    errorElement: <ErrorPage />,
  },
  {
    path: '/optimize',
    element: Result,
    errorElement: <ErrorPage />,
  },
  {
    path: '/connected-sites',
    element: ConnectedSites,
    errorElement: <ErrorPage />,
  },
  {
    path: '/task-history',
    element: TaskHistory,
    errorElement: <ErrorPage />,
  },
  {
    path: '/verify-email',
    element: VerifyEmail,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: Profile,
    errorElement: <ErrorPage />,
  },
];
