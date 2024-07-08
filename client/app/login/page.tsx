'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import './login.scss'

import { useEffect } from 'react'
import { getToken } from '@/components/utility/auth/actions/getToken'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    ifLoggedIn();
  }, []);

  const ifLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = await getToken(username, password);
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token saved:', token);
      router.push('/');
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