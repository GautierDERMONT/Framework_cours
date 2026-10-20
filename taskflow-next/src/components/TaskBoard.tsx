"use client";

import { useState } from "react";

import { STATUS_LABEL, type Status, type Task } from "@/lib/types";

type Filter = "all" | Status;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "done", label: "Terminées" },
];

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <article className="card">
      <header className="card__header">
        <h2>Tâches</h2>

        <div className="filters" role="group">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <ul className="tasks">
        {visible.map((t) => (
          <li key={t.id} className={`task task--${t.status}`}>
            <span className="task__status">{STATUS_LABEL[t.status]}</span>
            <span className="task__title">{t.title}</span>
            <span className={`prio prio--${t.priority}`}>
              P{t.priority}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}