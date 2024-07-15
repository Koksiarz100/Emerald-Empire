'use server'

import axios from 'axios';

export async function getToken(username: string, password: string): Promise<{token: string, credentials: any} | null> {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      username,
      password,
    });

    console.log('Token:', response.data.token);
    console.log('Credentials:', response.data.credentials);

    return {
      token: response.data.token,
      credentials: response.data.credentials
    };
  }
  catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}