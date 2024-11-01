import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

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

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (
        signIn({
          token: 'session',
          expiresIn: 1000 * 60 * 60 * 24 * 7,
          tokenType: 'Cookie',
          authState: data.user,
        })
      ) {
        // Successful login
        navigate('/dashboard');
      } else {
        throw new Error('Sign in failed');
      }
    } catch (err) {
      setMessage(err.message);
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
