import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this if your backend URL differs
});

// ✅ Attach token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;