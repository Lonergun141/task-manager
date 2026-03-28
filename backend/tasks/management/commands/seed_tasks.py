from django.core.management.base import BaseCommand
from tasks.models import Task


class Command(BaseCommand):
    help = "Seed the database with stub task data"

    def handle(self, *args, **options):
        tasks = [
            {"title": "Setup Django backend", "description": "Initialize Django project with DRF", "completed": True},
            {"title": "Create Task model", "description": "Define Task model with title, description, completed fields", "completed": True},
            {"title": "Build REST API endpoints", "description": "Setup ViewSet and Router for CRUD operations", "completed": True},
            {"title": "Setup React frontend", "description": "Initialize React Router project with Vite", "completed": True},
            {"title": "Create Axios API client", "description": "Build typed API layer to connect frontend to backend", "completed": True},
            {"title": "Build Task List UI", "description": "Create a simple table to display all tasks", "completed": False},
            {"title": "Implement Create Task form", "description": "Add a form to create new tasks from the frontend", "completed": False},
            {"title": "Add Edit Task functionality", "description": "Allow editing task title and description inline", "completed": False},
            {"title": "Add Delete Task button", "description": "Allow deleting tasks with confirmation", "completed": False},
            {"title": "Toggle task completion", "description": "Click to mark tasks as completed or pending", "completed": False},
        ]

        Task.objects.all().delete()
        for task_data in tasks:
            Task.objects.create(**task_data)

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(tasks)} tasks"))
