import { useState, useEffect } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

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

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formValue),
      });

      const data = await response.json();
      console.log('Login response:', data); // debug response

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const signInResult = signIn({
        token: 'true',
        expiresIn: 1000 * 60 * 60 * 24 * 7,
        tokenType: 'Cookie',
        authState: data.user,
      });

      console.log('SignIn result:', signInResult); // debug signIn

      if (signInResult) {
        // Successful login
        navigate('/dashboard');
      } else {
        throw new Error('Sign in failed');
      }
    } catch (err) {
      setMessage(err.message);
      console.error('Login error:', err); // debug errors
    }
  };
  return (
    <>
      <h1>Welcome to Login</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <label type='text' htmlFor='username'>
            username
          </label>
          <input
            name='username'
            id='username'
            value={formValue.username}
            onChange={handleInput}
          />
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={formValue.password}
            onChange={handleInput}
          />
          <button type='submit'>Login</button>
        </form>
      </section>
    </>
  );
}
