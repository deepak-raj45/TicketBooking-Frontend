import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    sessionStorage.setItem('username',event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the backend endpoint
    axios
      .post('https://easytickets.onrender.com/login', { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && response.data === 'Login successful') {
          navigate('/home'); // Redirect to the desired page
        } else {
          // Handle unsuccessful login
          console.log('Invalid')
          alert('Invalid Credentials');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle network errors or other exceptions here
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method='post'>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <a href="signup">New User?</a>
    </div>
  );
};

export default Login;
