import Link from "next/link";
import { notFound } from "next/navigation";

import { TaskBoard } from "@/components/TaskBoard";
import { getProject } from "@/lib/data";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <section>
      <Link href="/" className="link-button">
        ← Tous les projets
      </Link>

      <h1>{project.name}</h1>
      <p className="muted">{project.description}</p>

      <TaskBoard tasks={project.tasks} />
    </section>
  );
}