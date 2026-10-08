import { useEffect, useRef, useState, type FormEvent } from "react";

import type { Priority } from "../types";

type Props = {
  onAdd: (title: string, priority: Priority) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(2);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), priority);
    setTitle("");
    inputRef.current?.focus();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        Nouvelle tâche
      </label>

      <input
        id="new-task"
        ref={inputRef}
        value={title}
        placeholder="Ajouter une tâche…"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        aria-label="Priorité"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value) as Priority)}
      >
        <option value={1}>Haute</option>
        <option value={2}>Moyenne</option>
        <option value={3}>Basse</option>
      </select>

      <button type="submit" disabled={!title.trim()}>
        Ajouter
      </button>
    </form>
  );
}