import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carswap-api.vercel.app',
});

export default api;
