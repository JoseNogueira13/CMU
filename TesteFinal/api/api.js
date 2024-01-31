import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bikemad-api.vercel.app/',
});

export default api;
