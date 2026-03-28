import { useState } from "react";
import {
    isRouteErrorResponse,
    useLoaderData,
    useRevalidator,
} from "react-router";
import type { Route } from "./+types/home";
import {
    createTask,
    deleteTask,
    fetchTasks,
    toggleTaskComplete,
    updateTask,
} from "api/task";
import AddTaskModal from "components/AddTaskModal";
import EditTaskModal from "components/EditTaskModal";
import TaskErrorState from "components/TaskErrorState";
import TaskLoadingState from "components/TaskLoadingState";
import TaskTable from "components/TaskTable";
import type { Task } from "types/task";
import getApiErrorMessage from "utils/getApiErrorMessage";

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

clientLoader.hydrate = true as const;

export function HydrateFallback() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Task Manager
            </h1>
            <TaskLoadingState message="Loading tasks..." />
        </div>
    );
}

export default function Home() {
    const { tasks } = useLoaderData<{ tasks: Task[] }>();
    const revalidator = useRevalidator();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [isMutating, setIsMutating] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Updating tasks...");

    const isRefreshing = revalidator.state === "loading";
    const isBusy = isMutating || isRefreshing;

    const runTaskAction = async (
        taskAction: () => Promise<unknown>,
        nextLoadingMessage: string,
        fallbackMessage: string
    ) => {
        setActionError(null);
        setLoadingMessage(nextLoadingMessage);
        setIsMutating(true);

        try {
            await taskAction();
            revalidator.revalidate();
        } catch (error) {
            setActionError(getApiErrorMessage(error, fallbackMessage));
        } finally {
            setIsMutating(false);
            setLoadingMessage("Updating tasks...");
        }
    };

    const handleAdd = () => {
        setActionError(null);
        setShowAddModal(true);
    };

    const handleAddSubmit = async (task: {
        title: string;
        description: string;
        completed: boolean;
    }) => {
        setActionError(null);

        try {
            await createTask(task);
            setShowAddModal(false);
            revalidator.revalidate();
        } catch (error) {
            throw new Error(
                getApiErrorMessage(error, "Failed to create task.")
            );
        }
    };

    const handleEdit = (task: Task) => {
        setActionError(null);
        setEditingTask(task);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (
        id: number,
        data: { title: string; description: string }
    ) => {
        setActionError(null);

        try {
            await updateTask(id, data);
            setShowEditModal(false);
            setEditingTask(null);
            revalidator.revalidate();
        } catch (error) {
            throw new Error(
                getApiErrorMessage(error, "Failed to update task.")
            );
        }
    };

    const handleDelete = async (task: Task) => {
        if (!window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
            return;
        }

        await runTaskAction(
            () => deleteTask(task.id),
            "Deleting task...",
            `Failed to delete "${task.title}".`
        );
    };

    const handleToggleComplete = async (task: Task) => {
        await runTaskAction(
            () => toggleTaskComplete(task.id, !task.completed),
            "Updating task...",
            `Failed to update "${task.title}".`
        );
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Task Manager
            </h1>
            {actionError && (
                <TaskErrorState
                    message={actionError}
                    inline
                />
            )}
            {isBusy && (
                <TaskLoadingState
                    message={isRefreshing ? "Refreshing tasks..." : loadingMessage}
                    inline
                />
            )}
            <TaskTable
                tasks={tasks}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                isBusy={isBusy}
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Unable to load tasks right now.";

    if (isRouteErrorResponse(error)) {
        message = error.statusText || message;
    } else {
        message = getApiErrorMessage(error, message);
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Task Manager
            </h1>
            <TaskErrorState
                message={message}
                onRetry={() => window.location.reload()}
            />
        </div>
    );
}
