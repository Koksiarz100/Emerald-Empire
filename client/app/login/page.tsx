'use client'

import React, { useState } from 'react'

import './login.scss'

import { getToken } from '@/components/utility/auth/actions/getToken'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = await getToken(username, password);
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token saved:', token);
    } else {
      console.log('No token received');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}