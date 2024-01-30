import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nearfetch-api.vercel.app/',
});

export default api;
