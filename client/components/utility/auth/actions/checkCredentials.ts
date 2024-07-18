'use client'

export default async function checkCredentials() : Promise<string | null> {
  const getUsername = localStorage.getItem('username');

  if(getUsername) {
    return getUsername;
  }

  return null;
}