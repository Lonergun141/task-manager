import type { TaskTableProps } from "types/task";

export default function TaskTable({
    tasks,
    onAdd,
    onEdit,
    onDelete,
    onToggleComplete,
    isBusy,
}: TaskTableProps) {
    return (
        <div aria-busy={isBusy}>
            <div className="mb-4 flex items-end justify-end">
                <button
                    onClick={onAdd}
                    disabled={isBusy}
                    className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Add Task
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Created
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                                    No tasks found.
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {task.id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {task.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {task.description || "—"}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <select
                                            value={task.completed ? "completed" : "pending"}
                                            onChange={() => onToggleComplete(task)}
                                            disabled={isBusy}
                                            className={`rounded border border-gray-300 px-2 py-1 text-sm font-medium focus:border-blue-500 focus:outline-none ${task.completed ? "text-green-600" : "text-yellow-600"
                                                } disabled:cursor-not-allowed disabled:opacity-60`}
                                        >
                                            <option value="pending" className="text-yellow-600">Pending</option>
                                            <option value="completed" className="text-green-600">Completed</option>
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(task.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <button
                                            onClick={() => onEdit(task)}
                                            disabled={isBusy}
                                            className="mr-3 font-medium text-blue-600 transition-colors hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(task)}
                                            disabled={isBusy}
                                            className="font-medium text-red-600 transition-colors hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
