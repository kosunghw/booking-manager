import { useState } from 'react';

export default function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
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

    let res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(allInputvalue),
    });

    let resjson = await res.json();
    console.log(resjson);
    if (res.status === 200) {
      setMessage(resjson.success);
      console.log('log in successful');
    } else {
      setMessage('Some error occurred');
    }
    // console.log(allInputvalue);
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
