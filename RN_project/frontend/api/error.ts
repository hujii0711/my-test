import client from './client';

export async function error500() {
  const response = await client.get('/error500');
  return response.data;
}

export async function error400() {
  const response = await client.get('/error400');
  return response.data;
}
