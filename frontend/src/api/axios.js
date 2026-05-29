// import axios from 'axios';
// import toast from 'react-hot-toast';

// const API_BASE = import.meta.env.VITE_API_URL
//   ? import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api'
//   : 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true, // ✅ sends HTTP-only cookies automatically
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 1000);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api'
  : import.meta.env.PROD
    ? 'https://online-code-judge-ev5k.onrender.com/api'
    : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// ✅ Track if we already redirected to avoid loop
let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';

    // ✅ Never show toast or redirect for the initial profile check
    const isProfileCheck = url.includes('/auth/profile');
    // ✅ Don't redirect if already on login/register/landing
    const isPublicPage = ['/', '/login', '/register'].includes(window.location.pathname);

    if (error.response?.status === 401 && !isProfileCheck && !isPublicPage && !isRedirecting) {
      isRedirecting = true;
      toast.error('Session expired. Please login again.');
      setTimeout(() => {
        isRedirecting = false;
        window.location.href = '/login';
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;