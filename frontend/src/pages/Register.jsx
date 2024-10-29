import { useState } from 'react';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <h1>Welcome to Register</h1>
      <section>
        <form method='POST'>
          <label type='text' htmlFor='username'>
            username
          </label>
          <input name='username' id='username' />
          <label htmlFor='password'>password</label>
          <input type='password' name='password' id='password' />
          <button type='submit'>Register</button>
        </form>
      </section>
    </>
  );
}
