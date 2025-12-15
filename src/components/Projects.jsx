// src/components/Projects.jsx
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Projects() {
  const [ref, isVisible] = useScrollAnimation();

  const latestProjects = [...projects]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  
  return (
    <section
      id="projects"
      ref={ref}
      className={`py-24 bg-[#02040A] text-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-neon">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestProjects.map((project) => (
            <Link
              key={project.slug} // Moved key to the outer element
              to={`/projects/${project.slug}`}
              // Added 'flex flex-col h-full' to force equal height
              className="group bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow flex flex-col h-full"
            >
              {/* Removed the redundant inner div that duplicated styling */}
              
              {/* Image */}
              <div className="h-40 bg-black overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
                />
              </div>

              {/* Content - Added flex-1 to fill available space */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-neonblue">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-neon/10 border border-neon/20 rounded-md text-neon"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}