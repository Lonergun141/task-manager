import axios from "axios";
import type { Task } from "types/task";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await api.get<Task[]>("/tasks/");
    return response.data;
};

export const fetchTask = async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}/`);
    return response.data;
};

export const createTask = async (
    task: Omit<Task, "id" | "created_at">
): Promise<Task> => {
    const response = await api.post<Task>("/tasks/", task);
    return response.data;
};

export const updateTask = async (
    id: number,
    task: Omit<Task, "id" | "created_at">
): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}/`, task);
    return response.data;
};

export const patchTask = async (
    id: number,
    task: Partial<Omit<Task, "id" | "created_at">>
): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}/`);
};

export default api;
