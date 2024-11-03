import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function App() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Return a loading state or null while the navigation happens
  return <div>Loading...</div>;
}

export default App;
