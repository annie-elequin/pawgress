# Pawgress - Pet Care Management Application

## Overview
Pawgress is a modern web application designed to help pet owners manage and track their pets' daily activities, health, and care routines. The application provides a user-friendly interface for scheduling and monitoring various pet-related tasks.

## Tech Stack
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker
- **Authentication**: Custom authentication system

## Project Structure
```
pawgress/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── behaviors/      # Pet behavior tracking
│   │   ├── criteria/       # Pet care criteria
│   │   ├── dashboard/      # Main dashboard
│   │   ├── dogs/          # Pet management
│   │   ├── login/         # Authentication
│   │   └── signup/        # User registration
│   ├── lib/               # Utility functions and shared code
│   └── public/            # Static assets
│
├── backend/                # Node.js backend application
│   ├── src/               # Source code
│   │   ├── middleware/    # Custom middleware
│   │   └── index.js       # Main application file
│   └── prisma/            # Database schema and migrations
│
└── docker-compose.yml     # Docker configuration
```

## Features
1. **User Management**
   - User registration and authentication
   - Profile management

2. **Pet Management**
   - Add and manage multiple pets
   - Track pet details (name, type, breed, birthdate)

3. **Activity Tracking**
   - Schedule and track various pet activities:
     - Walks
     - Feeding
     - Medication
     - Grooming
   - Mark activities as completed
   - Add notes to activities

4. **Dashboard**
   - Overview of upcoming activities
   - Pet status and health tracking
   - Activity history

## Data Model
The application uses a relational database with the following main entities:

1. **User**
   - Basic user information (email, password, name)
   - One-to-many relationship with pets

2. **Pet**
   - Pet details (name, type, breed, birthdate)
   - Belongs to a user
   - One-to-many relationship with activities

3. **Activity**
   - Activity details (type, notes, scheduled time)
   - Belongs to a pet
   - Tracks completion status

## Getting Started
1. Clone the repository
2. Set up environment variables
3. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   yarn install

   # Install backend dependencies
   cd ../backend
   yarn install
   ```
4. Start the development servers:
   ```bash
   # Start frontend
   cd frontend
   yarn dev

   # Start backend
   cd ../backend
   yarn dev
   ```

## Docker Deployment
The application can be deployed using Docker Compose:
```bash
docker-compose up
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Add your license information here] 