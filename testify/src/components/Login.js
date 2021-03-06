import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { setUser } from '../actions';
import { isEmptyChildren } from 'formik';

const Login = props => {
  /* ==== Will use this for login when server set up ===== */
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    // if (Object.keys(props.currentUser).length) --this is checking if object is null by checking how many keys it has. 
    //PITA but simpler things you would expect to work dont. yay javascript!
    if (Object.keys(props.currentUser).length && props.currentUser.isTeacher){
      props.history.push('/Teacher');
    }
    else if (Object.keys(props.currentUser).length && !props.currentUser.isTeacher){
      props.history.push('/Student');
    }
  }, [props.loggedIn])

  console.log('Login.js credentials: ', credentials);
  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        if (res.data.user.isTeacher) {
          props.populateUser(res.data.user);
          props.setUser(res.data.user);
        } else {
          props.populateUser(res.data.user);
          props.setUser(res.data.user);
        }

        props.setLoggedIn(true);
        console.log('Login.js aWA .post res', res);
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log('Login.js post err: ', err);
      });
  };
  /* ==== Will use this for login when server set up ===== */
  return (
    <div className='login-container initial'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type='submit'>Log in</button>
      </form>
      <span>New here?</span>
      <br />
      <Link to='/SignUp'>Sign up for an account</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { setUser }
)(Login);
