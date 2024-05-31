// src/pages/Login.js
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'Erin Manjus' && password === 'password') {
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='log'>
        <div className='logi'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='but' type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
