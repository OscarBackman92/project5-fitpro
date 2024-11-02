// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com';
export const API_TIMEOUT = 15000;
export const API_UPLOAD_TIMEOUT = 30000;

// Workout Types
export const WORKOUT_TYPES = {
  CARDIO: 'cardio',
  STRENGTH: 'strength',
  FLEXIBILITY: 'flexibility',
  SPORTS: 'sports',
  OTHER: 'other'
};

// Intensity Levels
export const INTENSITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high'
};

// Display Labels
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

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY';
export const DISPLAY_TIME_FORMAT = 'hh:mm A';

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const DEFAULT_AVATAR = '/api/placeholder/150/150';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WORKOUTS: '/workouts',
  WORKOUT_NEW: '/workouts/new',
  WORKOUT_DETAILS: '/workouts/:id',
  FEED: '/feed',
  
  // Utility function to generate workout detail route
  getWorkoutDetails: (id) => `/workouts/${id}`
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};

// Gender Options
export const GENDER_OPTIONS = {
  MALE: 'M',
  FEMALE: 'F',
  OTHER: 'O'
};

export const GENDER_LABELS = {
  [GENDER_OPTIONS.MALE]: 'Male',
  [GENDER_OPTIONS.FEMALE]: 'Female',
  [GENDER_OPTIONS.OTHER]: 'Other'
};

// Goal Types
export const GOAL_TYPES = {
  WEIGHT: 'weight',
  WORKOUT: 'workout',
  STRENGTH: 'strength',
  CARDIO: 'cardio',
  CUSTOM: 'custom'
};

export const GOAL_TYPE_LABELS = {
  [GOAL_TYPES.WEIGHT]: 'Weight Goal',
  [GOAL_TYPES.WORKOUT]: 'Workout Frequency',
  [GOAL_TYPES.STRENGTH]: 'Strength Goal',
  [GOAL_TYPES.CARDIO]: 'Cardio Goal',
  [GOAL_TYPES.CUSTOM]: 'Custom Goal'
};

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  },
  WORKOUT: {
    MAX_DURATION: 1440, // 24 hours in minutes
    MIN_DURATION: 1
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_SETTINGS: 'user_settings',
  THEME: 'theme'
};

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  DEFAULT: 'An unexpected error occurred.',
  VALIDATION: {
    REQUIRED: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PASSWORD: 'Password must be at least 8 characters with letters and numbers.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match.',
    INVALID_FILE_TYPE: 'Invalid file type.',
    FILE_TOO_LARGE: 'File size exceeds the limit.',
    INVALID_DATE: 'Please enter a valid date.',
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully.',
  WORKOUT_CREATED: 'Workout logged successfully.',
  WORKOUT_UPDATED: 'Workout updated successfully.',
  WORKOUT_DELETED: 'Workout deleted successfully.',
  PICTURE_UPDATED: 'Profile picture updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
};