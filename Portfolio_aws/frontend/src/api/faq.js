import axios from 'axios';

const baseURL = __DEV__ ? 'https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev' : 'https://classloader.kr';
const client = axios.create({
  baseURL,
  timeout: 30 * 1000,
});

export async function selectTest() {
  const response = await client.get('/select', {
    params: {id: '30d7a29f-5d97-40d5-b40f-5f21eacb9812'},
  });
  console.log("response======", response);
  return response.data;
}