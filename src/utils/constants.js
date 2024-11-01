// src/utils/constants.js
export const API_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com';

export const WORKOUT_TYPES = {
  CARDIO: 'cardio',
  STRENGTH: 'strength',
  FLEXIBILITY: 'flexibility',
  SPORTS: 'sports',
  OTHER: 'other'
};

export const INTENSITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high'
};

export const WORKOUT_TYPE_LABELS = {
  [WORKOUT_TYPES.CARDIO]: 'Cardio',
  [WORKOUT_TYPES.STRENGTH]: 'Strength Training',
  [WORKOUT_TYPES.FLEXIBILITY]: 'Flexibility',
  [WORKOUT_TYPES.SPORTS]: 'Sports',
  [WORKOUT_TYPES.OTHER]: 'Other'
};

export const INTENSITY_LEVEL_LABELS = {
  [INTENSITY_LEVELS.LOW]: 'Low',
  [INTENSITY_LEVELS.MODERATE]: 'Moderate',
  [INTENSITY_LEVELS.HIGH]: 'High'
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WORKOUTS: '/workouts',
  WORKOUT_NEW: '/workouts/new',
  WORKOUT_DETAILS: '/workouts/:id',
  FEED: '/feed'
};