import db from "../../db.json";
import type { ProjectWithTasks, Task } from "./types";

const tasks = db.tasks as Task[];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getProjects(): Promise<ProjectWithTasks[]> {
  await wait(600);
  return db.projects.map((p) => ({
    ...p,
    tasks: tasks.filter((t) => t.projectId === p.id),
  }));
}

export async function getProject(
  id: string,
): Promise<ProjectWithTasks | null> {
  await wait(600);
  const project = db.projects.find((p) => p.id === id);
  if (!project) return null;
  return { ...project, tasks: tasks.filter((t) => t.projectId === id) };
}
