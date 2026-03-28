import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { fetchTasks } from "api/task";
import TaskTable from "components/TaskTable";
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

    const handleAdd = () => {
        console.log("Add task");
    };

    const handleEdit = (task: Task) => {
        console.log("Edit task", task.id);
    };

    const handleDelete = (task: Task) => {
        console.log("Delete task", task.id);
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
            />
        </div>
    );
}
