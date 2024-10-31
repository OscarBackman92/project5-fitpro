# Fitness Tracker

A full-stack fitness tracking application built with React and Django REST Framework. Track your workouts, monitor progress, and achieve your fitness goals.

![Dashboard Preview](placeholder-dashboard.png)
*Dashboard preview showing workout statistics and recent activities*

## Features

### User Authentication & Profile
- 🔐 Secure user registration and login
- 👤 Customizable user profiles with profile pictures
- 📝 Personal information management
- 🔄 Real-time profile updates

![Authentication Flow](placeholder-auth.gif)
*Demonstration of the authentication process*

### Workout Management
- ➕ Easy workout logging with detailed information:
  - Type (Cardio, Strength, Flexibility, Sports)
  - Duration
  - Calories burned
  - Intensity level
  - Notes
- 📊 Comprehensive workout history
- ✏️ Edit existing workouts
- 🗑️ Delete workout records

![Workout Logging](placeholder-workout-log.png)
*Workout logging interface*

### Dashboard & Analytics
- 📈 Overview of workout statistics
- 🎯 Total workouts completed
- ⏱️ Total duration of workouts
- 🔥 Total calories burned
- 📅 Recent workout history

## Technology Stack

### Frontend
- React
- React Router for navigation
- React Bootstrap for UI components
- Axios for API communication
- React Icons
- Context API for state management

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Token Authentication
- Cloudinary for image storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python (3.8 or higher)
- pip

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd fitness-tracker
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Authentication
1. Register a new account or login with existing credentials
2. Complete your profile setup with personal information
3. Upload a profile picture (optional)

### Tracking Workouts
1. Click "Log Workout" from the dashboard
2. Fill in workout details:
   - Select workout type
   - Enter duration
   - Input calories burned
   - Choose intensity level
   - Add notes (optional)
3. Save your workout

### Viewing History
1. Access "Workout History" from the navigation menu
2. View all past workouts
3. Edit or delete existing workouts
4. Track your progress over time

## Project Structure
```
src/
├── components/     # Reusable components
├── contexts/       # React Context providers
├── pages/         # Page components
├── services/      # API services
└── utils/         # Helper functions
```

## Completed Features
- ✅ User Registration
- ✅ User Login/Logout
- ✅ Profile Management
- ✅ Workout Logging
- ✅ Workout History
- ✅ CRUD Operations for Workouts

## Coming Soon
- 🚧 Workout Analytics & Charts
- 🚧 Fitness Goal Setting
- 🚧 Social Features (Follow Users)
- 🚧 Activity Feed
- 🚧 Comments & Likes

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
- Django REST Framework Documentation
- React Documentation
- React Bootstrap Components
- [Add other acknowledgments]

## Contact
- Developer - [Your Name]
- Project Link: [repository-url]
- Live Demo: [demo-url]

---
*Note: Replace placeholder images with actual screenshots/GIFs of your application.*