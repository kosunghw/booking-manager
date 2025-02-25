import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
