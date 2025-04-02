# Dog Training App Development Prompt

## Project Overview
Create a comprehensive dog training tracking application using Next.js, React, Express, Prisma, and Docker. This web application will allow dog owners and trainers to track their dogs' training progress across various behaviors and criteria.

## Tech Stack
- Frontend: Next.js and React
- Backend: Express.js
- Database ORM: Prisma
- Containerization: Docker
- Authentication: JWT or NextAuth.js

## Core Functionality Requirements

### User Authentication
- Implement secure login/signup functionality
- User profile management
- Password reset capabilities

### Dog Management (CRUD)
- Create, read, update, and delete dogs
- Each dog should have:
  - Name
  - Breed
  - Age
  - Photo (optional)
  - Notes/description
  - Date added

### Behavior Management (CRUD)
- Create, read, update, and delete behaviors
- Each behavior should have:
  - Title
  - Description
  - Category (optional)
  - Success tracking (percentage calculation)
  - Date created

### Criteria Management (CRUD)
- Create, read, update, and delete criteria
- Each criterion should have:
  - Name (e.g., "Distance", "Distractions")
  - Description
  - Difficulty level (optional)
  - Notes

### Associations and Relationships
- Associate behaviors with dogs (many-to-many relationship)
- Track success rate for each dog-behavior pair
- Associate criteria with behaviors
- Track progress of behaviors under different criteria

### Training Progress Tracking
- Calculate and display success percentage for each behavior per dog
- Track number of successes out of total attempts
- Visualize progress over time with charts/graphs
- Filter training data by dog, behavior, or criteria

## Database Schema
Design an efficient database schema using Prisma that supports:
- Users table
- Dogs table (with user foreign key)
- Behaviors table (with user foreign key)
- Criteria table (with user foreign key)
- Dog-Behavior junction table (with success tracking)
- Behavior-Criteria junction table
- Future expansion for training sessions

## API Endpoints
Implement RESTful API endpoints for all CRUD operations:
- User authentication endpoints
- Dog management endpoints
- Behavior management endpoints
- Criteria management endpoints
- Association endpoints
- Progress tracking endpoints

## UI/UX Requirements
- Clean, intuitive interface
- Mobile-responsive design
- Dashboard view showing dogs and their progress
- Easy navigation between dogs, behaviors, and criteria
- Progress visualization components

## Future Expansion Capabilities (to be implemented later)
Design the system to easily accommodate:
- Training session uploads with YouTube video links
- Success/failure tracking within training sessions
- Advanced filtering and reporting
- Sharing capabilities between users

## Deployment and Infrastructure
- Docker containerization for easy deployment
- Environment configuration for development and production
- Database migration scripts

## Code Quality Requirements
- TypeScript for type safety
- Component-based architecture
- Clean code principles
- Comprehensive error handling
- API documentation
- Unit and integration tests

Please implement this application with a focus on scalability and maintainability, as additional features will be added in the future.
