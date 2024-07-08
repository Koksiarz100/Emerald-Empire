'use server'

import axios from 'axios';

export async function getToken(username: string, password: string): Promise<string | null> {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      username,
      password,
    });

    console.log('Token:', response.data.token);
    return response.data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}