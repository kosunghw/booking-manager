import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // Clear error message when user starts typing again
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Password validation
    if (formValue.password !== formValue.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formValue.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const allInputvalue = {
      username: formValue.username,
      password: formValue.password,
    };

    try {
      const res = await fetch(
        `https://booking-manager-43gf.onrender.com/api/users`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(allInputvalue),
        }
      );

      const resjson = await res.json();
      if (res.status === 201) {
        setMessage('Registration successful! Redirecting to login...');
        // Redirect to login after successful registration
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(resjson.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('An error occurred during registration');
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
          Create your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium hover:opacity-80'
            style={{ color: '#45503B' }}
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                message.includes('success')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              } text-sm`}
            >
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
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <div className='mt-1'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  value={formValue.confirmPassword}
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
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
