const env = process.env.REACT_APP_ENV || 'development';
const apiUrl = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com';
const version = process.env.REACT_APP_VERSION || '0.1.0';

export const config = {
  env,
  apiUrl,
  version,
  isDevelopment: env === 'development',
  isProduction: env === 'production',
  apiTimeout: 15000,
  maxUploadSize: 5 * 1024 * 1024, // 5MB
};

// Log environment configuration in development
if (config.isDevelopment) {
  console.log('-------------------------');
  console.log('Environment:', env);
  console.log('API URL:', apiUrl);
  console.log('App Version:', version);
  console.log('-------------------------');
}

export default config;