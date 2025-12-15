import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { writeups } from "../data/writeups";

export default function Archive() {
  // Sort by newest writeups first
  const sortedWriteups = [...writeups].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="bg-cyberblack text-white min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* WRITEUPS ARCHIVE */}
        <section>
          <h1 className="text-4xl font-bold mb-8 text-neon">Writeups Archive</h1>
          <p className="text-gray-400 mb-10">All past CTF and security writeups.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedWriteups.map((w) => (
              <Link
                key={w.slug}
                to={`/writeups/${encodeURIComponent(w.slug)}`}
                className="group bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition"
                />

                <div className="p-5 space-y-3">
                  <p className="text-xs text-gray-400">
                    {new Date(w.date).toLocaleDateString()}
                  </p>

                  <h2 className="text-lg font-semibold text-neonblue">
                    {w.title}
                  </h2>

                  <p className="text-gray-300 text-sm line-clamp-3">
                    {w.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {w.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-1 bg-neon/10 border border-neon/20 rounded-full text-neon"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROJECTS ARCHIVE */}
<section>
  <h1 className="text-4xl font-bold mb-8 text-neon">Projects Archive</h1>
  <p className="text-gray-400 mb-10">All tools, frameworks, and labs you've built.</p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    {projects.map((p) => (
      <Link
        key={p.slug}
        to={`/projects/${p.slug}`}
        className="group bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow flex flex-col h-full"
      >
        {/* Image - Added shrink-0 to prevent squishing */}
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition shrink-0"
        />

        {/* Content - Added flex-1 and flex-col to manage spacing */}
        <div className="p-5 space-y-3 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold text-neonblue">
            {p.title}
          </h2>

          {/* Description - Added flex-1 to push tags to the bottom */}
          <p className="text-gray-300 text-sm line-clamp-3 flex-1">
            {p.description}
          </p>

          {/* Tags - Added mt-auto to stick to bottom */}
          <div className="flex flex-wrap gap-2 pt-2 mt-auto">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-1 bg-neon/10 border border-neon/20 rounded-full text-neon"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
      </div>
    </main>
  );
}
