# Task Manager

A full-stack Task Manager application built with Django REST Framework and React (with React Router v7). This project implements a strict set of rules for API structure and stateless UI actions, designed as an operational test for a software developer.

## Project Structure

The repository is neatly organized into two independent stacks:
- `/backend/` - The Django Python project serving the REST API via explicitly defined ViewSets.
- `/frontend/` - The React application utilizing Tailwind CSS, Axios, and React Router to build the UI and manage state.

---

## 🚀 Setup Instructions

### 1. Backend (Django)

The backend uses Django with SQLite as the default database. Ensure you have Python 3.10+ installed.

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/Scripts/activate  # (Windows)
   # source .venv/bin/activate    # (Mac/Linux)
   ```
3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the database migrations to build the SQLite database:
   ```bash
   python manage.py migrate
   ```
5. *(Optional)* Seed the database with some placeholder tasks:
   ```bash
   python manage.py seed_tasks
   ```
6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   *The API will now be running at http://127.0.0.1:8000/*

### 2. Frontend (React)

The frontend is a Vite + React Router application. Ensure you have Node.js 18+ installed.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend folder (if it doesn't already exist) and define the backend API URL:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The UI will now be running at http://localhost:5173/*

---

## 📡 API Endpoint Summary

The backend uses standard RESTful architecture. Notably, it utilizes a raw `viewsets.ViewSet` instead of `ModelViewSet` to enforce strict payload handling.

| Method | Endpoint | Description | Payload Constraints |
| :--- | :--- | :--- | :--- |
| **GET** | `/tasks/` | List all tasks | None |
| **POST** | `/tasks/` | Create a new task | `{ title, description }` |
| **GET** | `/tasks/{id}/` | Retrieve a task by ID | None |
| **PUT** | `/tasks/{id}/` | Update an existing task | Updates **Title & Description only**. Prevents completing status changes. |
| **PATCH** | `/tasks/{id}/` | Toggle task completion | Updates **Completed status only**. Prevents title/desc changes. |
| **DELETE** | `/tasks/{id}/` | Delete a task | None |



