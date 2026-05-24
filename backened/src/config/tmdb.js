const axios = require('axios');

console.log('TMDB Base URL:', process.env.TMDB_BASE);
console.log('TMDB Token exists:', !!process.env.TMDB_BEARER);

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE || 'https://api.themoviedb.org/3',
  timeout: 15000, // 15 seconds timeout
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
    'Content-Type': 'application/json',
  },
});

// Global response interceptor for cleaner error messages
tmdb.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the real TMDB error
    console.log('TMDB Error Status:', error.response?.status);
    console.log('TMDB Error Data:', JSON.stringify(error.response?.data, null, 2));
    console.log('TMDB Error Message:', error.message);

    const status = error.response?.status || 500;
    const responseData = error.response?.data || {};
    const message = responseData.status_message || error.message || 'TMDB API request failed';
    
    const err = new Error(message);
    err.statusCode = status;
    err.details = responseData;
    
    return Promise.reject(err);
  }
);

module.exports = tmdb;