'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import LoginFrom from '@/components/login/LoginFrom'
import { checkToken } from '@/components/utility/auth/actions/checkToken'

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    checkToken();
    ifLoggedIn();
  }, []);

  const ifLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }

  return (
    <LoginFrom />
  );
}