import axios from 'axios';

export default axios.create({
  baseURL: 'https://masa-depan.id/api/public/api',
  timeout: 5000,
});

// ('https://masa-depan.id/api/public/api');

// 'http://10.0.2.2:8000/api'
