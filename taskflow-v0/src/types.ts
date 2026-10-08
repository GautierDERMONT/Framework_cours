export type Status = "todo" | "doing" | "done";
export type Priority = 1 | 2 | 3;
export type Filter = "all" | Status;


export type Project = {
  id: string;
  name: string;
  description: string;
};

export type ProjectWithTasks = Project & {
  tasks: Task[];
};

export type Task = {
  id: string;
  projectId?: string;
  title: string;
  status: Status;
  priority: Priority;
};


export const STATUS_LABEL: Record<Status, string> = {
  todo: "A faire",
  doing: "En cours",
  done: "Terminé",
};

export const nextStatus = (s: Status): Status =>
  s === "todo" ? "doing" : s === "doing" ? "done" : "todo";