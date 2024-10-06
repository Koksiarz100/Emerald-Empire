'use client'

export default function checkCredentials() : string | null {
  const getUsername = localStorage.getItem('username');

  if(getUsername) {
    return getUsername;
  }

  return null;
}