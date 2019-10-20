import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export default function Login(props) {
  /* ==== Will use this for login when server set up ===== */
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [teacher, setTeacher] = useState(false);
  console.log(teacher);
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        if (teacher) {
          props.history.push('/Teacher');
        } else {
          props.history.push('/Student');
        }

        props.setLoggedIn(true);
        console.log('Login.js aWA .post res', res);
      })
      .catch(err => {
        alert(err.error);
        console.log('Login.js post err: ', err.response);
      });
  };
  /* ==== Will use this for login when server set up ===== */
  return (
    <div className='login-container initial'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type='text' name='username' onChange={handleChange} />
        <input type='password' name='password' onChange={handleChange} />
        <button type='submit'>Log in</button>
        <label htmlFor='teacher'>I'm a teacher</label>
        <input
          onClick={() => setTeacher(!teacher)}
          name='teacher'
          type='checkbox'
        />
      </form>
    </div>
  );
}
