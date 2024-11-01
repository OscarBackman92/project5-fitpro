import axios from 'axios';
import { API_URL } from './constants';

// Request cache implementation
const requestCache = new Map();
const pendingRequests = new Map();

const generateCacheKey = (config) => {
  return `${config.method}:${config.url}:${JSON.stringify(config.params)}`;
};

// Cache configuration
const CACHE_DURATION = 60000; // 1 minute cache
const CACHEABLE_METHODS = ['GET'];

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    // Add timestamp to prevent browser caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };

    // Check cache for GET requests
    if (CACHEABLE_METHODS.includes(config.method?.toUpperCase())) {
      const cacheKey = generateCacheKey(config);
      const cachedResponse = requestCache.get(cacheKey);
      
      if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_DURATION)) {
        return Promise.resolve(cachedResponse.data);
      }
      
      if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey);
      }
      
      const promise = axiosInstance(config)
        .then(response => {
          requestCache.set(cacheKey, {
            data: response,
            timestamp: Date.now()
          });
          return response;
        })
        .finally(() => {
          pendingRequests.delete(cacheKey);
        });
      
      pendingRequests.set(cacheKey, promise);
      return promise;
    }

    // Log only in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;