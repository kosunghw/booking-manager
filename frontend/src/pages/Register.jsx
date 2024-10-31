import { useState } from 'react';

export default function Register() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputvalue = {
      username: formValue.username,
      password: formValue.password,
    };

    let res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(allInputvalue),
    });

    let resjson = await res.json();
    if (res.status === 201) {
      setMessage(resjson.success);
    } else {
      setMessage('Some error occurred');
    }
    // console.log(allInputvalue);
  };

  return (
    <>
      <h1>Welcome to Register</h1>
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
          <label htmlFor='confirmPassword'>confirm password</label>

          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={formValue.confirmPassword}
            onChange={handleInput}
          />
          <button type='submit'>Register</button>
        </form>
      </section>
    </>
  );
}
