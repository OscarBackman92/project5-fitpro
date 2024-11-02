import { authService } from './services/auth.service';
import { profileService } from './services/profile.Service';
import { workoutService } from './services/workout.service';
// import { socialService } from './services/social.service';
import { getErrorMessage } from '../utils/error-handler';

export const api = {
  auth: authService,
  profile: profileService,
  workouts: workoutService,
  // social: socialService
};

export { getErrorMessage };
export default api;