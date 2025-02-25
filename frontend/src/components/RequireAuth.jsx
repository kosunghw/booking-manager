import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
