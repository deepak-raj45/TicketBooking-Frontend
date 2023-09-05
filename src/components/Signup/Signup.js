import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    // Make a POST request to the backend endpoint
    axios
      .post('https://easytickets.onrender.com/signup', { username, password, email })
      .then((response) => {
        console.log(response.data);
        // Redirect to login page after successful registration
        this.setState({ shouldRedirect: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { username, password, email, shouldRedirect } = this.state;
    if (shouldRedirect) {
        alert("User created Successfully")
      return <Navigate to="/" />;
    }

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <br />
          <label>
            Mail:
            <input
              type="text"
              value={email}
              onChange={this.handleEmailChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <a href="/">Existing User?</a>
      </div>
    );
  }
}

export default Signup;