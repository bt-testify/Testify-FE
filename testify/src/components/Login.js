import React from 'react';

export default function Login() {
  /* ==== Will use this for login when server set up ===== */
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
        console.log('Login.js aWA .post res', res);
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log('Login.js post err: ', err.response);
      });
  };
  /* ==== Will use this for login when server set up ===== */
  return (
    <div>
      <h1 className='initial'></h1>
    </div>
  );
}
