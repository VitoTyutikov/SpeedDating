import React, { useState } from 'react';
import { User } from '../../service/api/User';
// import {jwtDecode} from 'jwt-decode';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    console.log(JSON.stringify({ username, password }));
    event.preventDefault();
    // try {
    User.login(username, password)
      .then((response) => {
        window.location.href = '/profile';
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      })

  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

