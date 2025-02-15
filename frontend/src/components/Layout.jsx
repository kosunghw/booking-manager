// src/components/Layout.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNav, setShowNav] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        signOut();
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Response status:', response.status);
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{ backgroundColor: '#F5F2EA' }}
    >
      {/* Header - Fixed width container */}
      <header className='shadow w-full' style={{ backgroundColor: '#45503B' }}>
        <div className='w-full px-8 py-6'>
          <div className='flex justify-between items-center'>
            <Link
              to='/dashboard'
              className='flex items-center gap-2 hover:opacity-80 transition-opacity'
            >
              <div className=' font-bold text-3xl' style={{ color: '#F8BE5C' }}>
                RoomBook
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className='px-4 py-2  rounded-md hover:bg-gray-300'
              style={{ backgroundColor: '#F8BE5C', color: '#45503B' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='flex-1 flex overflow-hidden'>
        {/* Sidebar */}
        {showNav && (
          <nav className='w-64' style={{ backgroundColor: '#E8E5DD' }}>
            <div className='py-6 px-4'>
              <Link
                to='/dashboard'
                className={`block px-4 py-2 rounded-md mb-2 transition-colors`}
                style={{
                  color: '#45503B',
                  backgroundColor:
                    location.pathname === '/dashboard'
                      ? '#D8D5CD'
                      : 'transparent',
                  fontWeight: '500', // Default weight
                  ...(location.pathname === '/dashboard' && {
                    fontWeight: '600', // Bolder when active
                  }),
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Dashboard
              </Link>
              <Link
                to='/settings'
                className={`block px-4 py-2 rounded-md transition-colors`}
                style={{
                  color: '#45503B',
                  backgroundColor:
                    location.pathname === '/settings'
                      ? '#D8D5CD'
                      : 'transparent',
                  fontWeight: '500', // Default weight
                  ...(location.pathname === '/settings' && {
                    fontWeight: '600', // Bolder when active
                  }),
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Settings
              </Link>
            </div>
          </nav>
        )}

        {/* Page Content */}
        <main
          className='flex-1 overflow-auto '
          style={{ backgroundColor: '#F5F2EA' }}
        >
          <div className='container mx-auto px-8 py-6'>{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className='w-full' style={{ backgroundColor: '#45503B' }}>
        <div className='w-full px-8 py-4'>
          <div className='flex justify-between items-center'>
            <p style={{ color: '#F8BE5C' }}>
              © {new Date().getFullYear()} RoomBook. All rights reserved.
            </p>
            <a
              href='https://github.com/kosunghw'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 transition-opacity'
              style={{ color: '#F8BE5C' }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='inline-block'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
