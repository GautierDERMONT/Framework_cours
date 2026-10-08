import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { FilterBar } from "../components/FilterBar";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import {
  nextStatus,
  type Filter,
  type Priority,
  type Project,
  type ProjectWithTasks,
  type Task,
} from "../types";

export function ProjectsPage() {
  const { id } = useParams<{ id: string }>();

  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!id) {
      api
        .getProjects()
        .then((data) => {
          if (!ignore) setProjects(data);
        })
        .catch(() => {
          if (!ignore) setError("Impossible de charger les projets.");
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    } else {
      Promise.all([api.getProject(id), api.getTasks(id)])
        .then(([proj, taskList]) => {
          if (!ignore) {
            setProject(proj);
            setTasks(taskList);
          }
        })
        .catch(() => {
          if (!ignore) setError("Impossible de charger le projet.");
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [id]);


  async function add(title: string, priority: Priority) {
    if (!id) return;
    try {
      const created = await api.createTask({
        projectId: id,
        title,
        status: "todo",
        priority,
      });
      setTasks((prev) => [...prev, created]);
      setError(null);
    } catch {
      setError("La tâche n'a pas pu être ajoutée.");
    }
  }

  async function cycle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const newStatus = nextStatus(task.status);
    try {
      await api.updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
      setError(null);
    } catch {
      setError("Le statut n'a pas pu être modifié.");
    }
  }

  async function remove(taskId: string) {
    try {
      await api.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setError(null);
    } catch {
      setError("La tâche n'a pas pu être supprimée.");
    }
  }


  if (loading) return <p className="loading">Chargement…</p>;

  if (error) {
    return (
      <section className="page">
        <p className="error" role="alert">
          {error}
        </p>
        <Link to="/projects" className="link-button">
          ← Tous les projets
        </Link>
      </section>
    );
  }

  if (!id) {
    return (
      <section className="page">
        <header className="page-header">
          <h2>Projets</h2>
          <Link to="/projects/new" className="button">
            + Nouveau projet
          </Link>
        </header>

        {projects.length === 0 ? (
          <p className="empty">Aucun projet pour le moment.</p>
        ) : (
          <ul className="project-grid">
            {projects.map((p) => {
              const done = p.tasks.filter(
                (t) => t.status === "done"
              ).length;
              return (
                <li key={p.id}>
                  <Link
                    to={`/projects/${p.id}`}
                    className="project-card"
                  >
                    <h2>{p.name}</h2>
                    <p className="muted">{p.description}</p>
                    <p className="small">
                      {done} / {p.tasks.length} tâche(s) terminée(s)
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }

  const visible =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <section className="page">
      <header className="page-header">
        <h2>{project?.name ?? "Projet"}</h2>
        <Link to="/projects" className="link-button">
          ← Tous les projets
        </Link>
      </header>

      {project?.description && (
        <p className="muted">{project.description}</p>
      )}

      <TaskForm onAdd={add} />

      <FilterBar value={filter} onChange={setFilter} />

      <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
    </section>
  );
}