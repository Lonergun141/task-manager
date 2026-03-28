# Task Manager

Full-stack task manager built with Django REST Framework and React. The backend exposes task CRUD endpoints, and the frontend provides a UI for listing, creating, editing, completing, and deleting tasks.

## Project Structure

- `backend/` - Django project and `tasks` app
- `frontend/` - React app with React Router, Axios, and Tailwind CSS

## Setup Instructions

### Backend

Requirements: Python 3.10+

1. Open a terminal in the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```
3. Activate it:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Optional: seed sample data:
   ```bash
   python manage.py seed_tasks
   ```
7. Start the API server:
   ```bash
   python manage.py runserver
   ```

The backend runs at `http://127.0.0.1:8000`.

### Frontend

Requirements: Node.js 18+

1. Open a second terminal in the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the repo-root `.env` file contains:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173`.

## API Endpoint Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/tasks/` | List all tasks |
| `POST` | `/tasks/` | Create a task |
| `GET` | `/tasks/{id}/` | Retrieve a task |
| `PUT` | `/tasks/{id}/` | Update `title` and `description` only |
| `PATCH` | `/tasks/{id}/` | Update `completed` only |
| `DELETE` | `/tasks/{id}/` | Delete a task |

## Additional Notes / Assumptions

- SQLite is the default database at `backend/db.sqlite3`.
- The frontend reads `VITE_API_BASE_URL` from the repo-root `.env` via `frontend/vite.config.ts`.
- Useful frontend checks:
  - `npm run build`
  - `npm run typecheck`
