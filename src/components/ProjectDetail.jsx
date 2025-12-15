import { useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="text-white p-20 text-center">
        <h1 className="text-3xl">Project not found</h1>
      </main>
    );
  }

  return (
    <main className="bg-[#0D1117] text-white min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg border border-neon/20"
        />

        <h1 className="text-4xl font-bold text-neon">{project.title}</h1>

        <p className="text-gray-300">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-neon/10 border border-neon/20 rounded text-neon text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-neon rounded text-neon hover:bg-neon/10"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </main>
  );
}
