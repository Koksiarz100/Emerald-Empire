export function validateToken(token: string): Promise<number> {
  const url = 'http://localhost:8080/protected';

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) => {
    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          resolve(200);
        } else {
          console.error('Server responded with status:', response.status);
          response.json().then(body => reject({status: response.status, body})).catch(() => reject({status: response.status}));
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        reject(500);
      });
  });
}