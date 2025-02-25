import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
// Components
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Layout from './components/Layout.jsx';
import Settings from './pages/Settings.jsx';
import RequireAuth from './components/RequireAuth.jsx';
const authConfig = {
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <Layout>
          <Dashboard />
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: '/settings',
    element: (
      <RequireAuth>
        <Layout>
          <Settings />
        </Layout>
      </RequireAuth>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...authConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
