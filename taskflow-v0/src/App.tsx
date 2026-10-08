import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";

import { Card } from "./components/Card";
import { FilterBar } from "./components/FilterBar";
import { FocusTimer } from "./components/FocusTimer";
import { Layout } from "./components/Layout";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

import { AboutPage } from "./pages/AboutPage";
import { NewProjectPage } from "./pages/NewProjectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectsPage } from "./pages/ProjectsPage";

import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  nextStatus,
  type Filter,
  type Priority,
  type Task,
} from "./types";

// ============================================================
// Board : la page d'accueil locale (localStorage)
// ============================================================
function Board() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("taskflow-tasks", []);
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const remaining = tasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    document.title = remaining > 0 ? `(${remaining}) TaskFlow` : "TaskFlow";
  }, [remaining]);

  function add(title: string, priority: Priority) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: "todo", priority },
    ]);
  }

  const cycle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: nextStatus(t.status) } : t
      )
    );

  const remove = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <section className="page">
      <Card title="Concentration">
        <FocusTimer />
      </Card>

      <Card title="Tâches">
        <TaskForm onAdd={add} />
        <FilterBar value={filter} onChange={setFilter} />
        <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      </Card>
    </section>
  );
}

function ProjectRoute() {
  const { id = "" } = useParams();
  return <ProjectsPage key={id} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Board />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/new" element={<NewProjectPage />} />
        <Route path="projects/:id" element={<ProjectRoute />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}