'use client'

import { validateToken } from '@/components/utility/auth/actions/validateToken'

interface ApiError {
  status: number;
}

export async function checkToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const status = await validateToken(token);
      if (status === 200) {
        console.log('Token is valid.');
      }
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 500) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.error('Invalid token, deleted.');
      } else {
        console.error('Error validating token:', error);
      }
    }
  }
  else {
    localStorage.removeItem('username');
    console.log('No token found.');
  }
}