import Link from "next/link";
export const instant = false;
import { getProjects } from "@/lib/data";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section>
      <h1>Projets</h1>

      <ul className="project-grid">
        {projects.map((p) => {
          const done = p.tasks.filter((t) => t.status === "done");

          return (
            <li key={p.id}>
              <Link href={`/projects/${p.id}`} className="project-card">
                <h2>{p.name}</h2>
                <p className="muted">{p.description}</p>
                <p className="small">
                  {done.length} / {p.tasks.length} tâche(s) terminée(s)
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}