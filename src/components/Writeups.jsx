import { Link } from "react-router-dom";
import { writeups } from "../data/writeups";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Writeups() {
  const [ref, isVisible] = useScrollAnimation();

  // Get latest 3 writeups by date (newest first)
  const latestWriteups = [...writeups]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section
      id="writeups"
      ref={ref}
      className={`py-24 bg-[#0D1117] text-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-neon">
          Writeups
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestWriteups.map((writeup) => (
                <Link
                  key={writeup.slug}
                  to={`/writeups/${encodeURIComponent(writeup.slug)}`}
                  className="group bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow"
                >
                    <div
                      key={writeup.slug}
                      className="bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow"
                    >
                      {/* Image */}
                      <div className="h-40 bg-black overflow-hidden">
                        <img
                          src={writeup.image}
                          alt={writeup.title}
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                            {/* Optional date */}
                            {writeup.date && (
                              <p className="text-xs text-gray-400">
                                {new Date(writeup.date).toLocaleDateString()}
                              </p>
                            )}

                            <h3 className="text-xl font-semibold text-neonblue">
                              {writeup.title}
                            </h3>

                            <p className="text-gray-300 text-sm">
                              {writeup.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {writeup.tags?.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-3 py-1 bg-neon/10 border border-neon/20 rounded-md text-neon"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                      </div>
                    </div>
                </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
