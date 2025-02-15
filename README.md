# **Pawgress** 🐾

**Pawgress** is a dog training app designed to help owners track their dogs' training progress using spaced repetition. The app allows users to add and assign behaviors to multiple dogs, log training sessions, and track the progress of individual training reps. Users can manage their own training sessions, assign behaviors to dogs, and receive reminders for spaced repetition practice.

## **Project Structure**  
This repository uses a **monorepo** structure with **Yarn Workspaces**, containing both the backend and frontend of the app.

- **`backend/`**: The backend API built with **Express** and **Prisma** for interacting with the database.
- **`frontend/`**: The frontend of the app built with **Next.js** (React), serving the web interface for users to interact with.

---

## **Getting Started**

### **1️⃣ Clone the Repository**
First, clone the repository to your local machine:
```bash
git clone https://github.com/your-username/pawgress.git
cd pawgress
```

### **2️⃣ Install Dependencies**
Run the following command to install all dependencies for both the frontend and backend:
```bash
yarn install
```

### **3️⃣ Set Up Environment Variables**
Make sure you have a `.env` file in both the **frontend** and **backend** directories (if you're not using Docker). You'll need to specify any necessary environment variables, such as database URLs, API keys, etc.

For local development, you might add variables like:
```env
# In backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/pawgress_db
```

For **production**, you'll need to ensure these variables are set in your Docker container or server environment.

### **4️⃣ Run the Project Locally**

You can run both the frontend and backend using Yarn Workspaces. Use the following commands:

- **Backend (API)**:  
  To run the backend API:
  ```bash
  yarn bdev
  ```

- **Frontend (Web Interface)**:  
  To run the frontend web app:
  ```bash
  yarn fdev
  ```

If you run `yarn dev`, both services will run in parallel on different ports (by default, **frontend** on `3000` and **backend** on `3001`).

### **5️⃣ Running with Docker (Optional)**

If you want to run the entire app using Docker and Docker Compose, you can use the `docker-compose.yml` to set up the services:

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The frontend will be available at `http://localhost:3000`, and the backend API will be at `http://localhost:3001`.

### **6️⃣ Testing the Project**

Once the app is running, you can test the backend API by visiting:

- **Backend API**: `http://localhost:3001`  
- **Frontend Web Interface**: `http://localhost:3000`

You can start creating **dogs**, **behaviors**, and **track training sessions**!

---

## **Project Overview**

**Pawgress** allows users to track dog training using a **spaced repetition** system. Here's a summary of the key features:

- **User Authentication** (not yet implemented)
- **Multiple Dogs per User**
- **Behavior Library** (fully customizable)
- **Track Training Sessions** (success/failure rate for reps)
- **Spaced Repetition Integration**: Reminders to train based on past sessions (coming soon)

---

## **Technologies Used**

- **Backend**:  
  - **Node.js** with **Express**  
  - **Prisma ORM** for database management  
  - **PostgreSQL** for the database

- **Frontend**:  
  - **Next.js** (React-based framework)  
  - **TailwindCSS** for styling (coming soon)

- **Other**:  
  - **Yarn Workspaces** for monorepo management  
  - **Docker** for containerization (optional)

---

## **Contributing**

Feel free to fork and create pull requests for any improvements or bug fixes!

---

Let me know if you'd like to modify or add anything to the README!
