import type { Project, ProjectWithTasks, Task } from "./types";

const API_URL = "http://localhost:3001";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(API_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Erreur ${response.status} sur ${path}`,
    );
  }

  return (await response.json()) as T;
}

export type NewProject = Omit<Project, "id">;
export type NewTask = Omit<Task, "id">;

export const api = {
  getProjects: () =>
    request<ProjectWithTasks[]>("/projects?_embed=tasks"),

  getProject: (id: string) =>
    request<Project>(`/projects/${id}`),

  createProject: (data: NewProject) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getTasks: (projectId: string) =>
    request<Task[]>(
      `/tasks?projectId=${encodeURIComponent(projectId)}`,
    ),

  createTask: (data: NewTask) =>
    request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTask: (id: string, changes: Partial<Task>) =>
    request<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
    }),

  deleteTask: (id: string) =>
    request<Task>(`/tasks/${id}`, { method: "DELETE" }),
};