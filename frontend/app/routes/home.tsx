import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import type { Route } from "./+types/home";
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from "api/task";
import TaskTable from "components/TaskTable";
import AddTaskModal from "components/AddTaskModal";
import EditTaskModal from "components/EditTaskModal";
import type { Task } from "types/task";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Task Manager" },
        { name: "description", content: "Manage your tasks" },
    ];
}

export async function clientLoader() {
    const tasks = await fetchTasks();
    return { tasks };
}

export default function Home() {
    const { tasks } = useLoaderData<{ tasks: Task[] }>();
    const revalidator = useRevalidator();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleAddSubmit = async (task: { title: string; description: string; completed: boolean }) => {
        await createTask(task);
        setShowAddModal(false);
        revalidator.revalidate();
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (id: number, data: { title: string; description: string }) => {
        await updateTask(id, data);
        setShowEditModal(false);
        setEditingTask(null);
        revalidator.revalidate();
    };

    const handleDelete = async (task: Task) => {
        if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
            await deleteTask(task.id);
            revalidator.revalidate();
        }
    };

    const handleToggleComplete = async (task: Task) => {
        await toggleTaskComplete(task.id, !task.completed);
        revalidator.revalidate();
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Task Manager
            </h1>
            <TaskTable
                tasks={tasks}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
            <AddTaskModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddSubmit}
            />
            <EditTaskModal
                task={editingTask}
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
}
