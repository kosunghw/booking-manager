import { useState, useEffect } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // console.log(isAuthenticated);
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://booking-manager-43gf.onrender.com/api/auth/login',
        formValue
      );

      const { token, user } = response.data;

      const signInResult = signIn({
        token: token,
        expiresIn: 1000 * 60 * 60 * 24 * 7,
        tokenType: 'Bearer',
        authState: user,
      });

      if (signInResult) {
        navigate(from, { replace: true });
      } else {
        throw new Error('Sign in failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setMessage(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'
      style={{ backgroundColor: '#F5F2EA' }}
    >
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Welcome Back
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Please sign in to your account
        </p>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <Link
            to='/register'
            className='font-medium hover:opacity-80'
            style={{ color: '#45503B' }}
          >
            Register here
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {message && (
            <div className='mb-4 p-4 rounded-md bg-red-50 text-red-500 text-sm'>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'
              >
                Username
              </label>
              <div className='mt-1'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  required
                  value={formValue.username}
                  onChange={handleInput}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  value={formValue.password}
                  onChange={handleInput}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={loading}
                className='flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                style={{ backgroundColor: '#45503B', color: '#F8BE5C' }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
