import axios from 'axios';

const BASE_URL = import.meta.env.PROD
  ? 'https://api.tezport.com/api/v1'
  : 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
});
