# API Documentation

## Authentication Endpoints

### Login
```http
POST /api/auth/login/
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string"
  }
}
```

### Register
```http
POST /api/auth/register/
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "profile": {
    "name": "string"
  }
}
```

## Profile Endpoints

### Get Profile
```http
GET /api/profiles/me/
```

**Response:**
```json
{
  "id": "number",
  "user": {
    "username": "string",
    "email": "string"
  },
  "name": "string",
  "weight": "number",
  "height": "number",
  "fitness_goals": "string",
  "profile_picture": "string",
  "date_of_birth": "string",
  "gender": "string"
}
```

## Workout Endpoints

### Get All Workouts
```http
GET /api/workouts/
```

**Response:**
```json
[
  {
    "id": "number",
    "workout_type": "string",
    "date_logged": "string",
    "duration": "number",
    "calories": "number",
    "intensity": "string",
    "notes": "string"
  }
]
```

### Create Workout
```http
POST /api/workouts/
```

**Request Body:**
```json
{
  "workout_type": "string",
  "date_logged": "string",
  "duration": "number",
  "calories": "number",
  "intensity": "string",
  "notes": "string"
}
```