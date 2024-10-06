'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/utility/auth/Auth'

import './loginForm.scss'

import { getToken } from '@/components/utility/auth/actions/getToken'

export default function LoginFrom() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { updateUsername } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials = await getToken(username, password);
    if (credentials) {
      localStorage.setItem('token', credentials.token);
      localStorage.setItem('username', credentials.credentials.username)
      const username = credentials.credentials.username;
      updateUsername(username);
      console.log('Token saved:', credentials.token);
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
  )
}