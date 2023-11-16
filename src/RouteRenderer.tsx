import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './utils/hooks/useAuth';
import { AuthenticatedRootRoutes, RootRoutes } from './utils/routes';
import NotFound from './pages/404';

const RouteRenderer = ({ children }: any) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {isAuthenticated
        ? AuthenticatedRootRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))
        : RootRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteRenderer;
