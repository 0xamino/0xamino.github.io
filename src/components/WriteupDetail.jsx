import { useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { writeups } from "../data/writeups";

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getNodeText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (node.props?.children) return getNodeText(node.props.children);
  return "";
}

function extractHeadings(markdown) {
  // grabs ## and ### headings for TOC (skip # because that's your page title already)
  const lines = String(markdown || "").split("\n");
  const headings = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length; // 2 or 3
    const text = m[2].replace(/\s+#\s*$/, "").trim();
    if (!text) continue;
    headings.push({ level, text, id: slugify(text) });
  }
  return headings;
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-700/60 bg-black/20 px-3 py-1 text-xs text-gray-200">
      {children}
    </span>
  );
}

function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm text-gray-200 text-right">{value}</div>
    </div>
  );
}

export default function WriteupDetails() {
  const { slug } = useParams();

  const decoded = useMemo(() => {
    try {
      return decodeURIComponent(slug || "");
    } catch {
      return slug || "";
    }
  }, [slug]);

  const w = useMemo(() => writeups.find((x) => x.slug === decoded), [decoded]);

  const toc = useMemo(() => extractHeadings(w?.content), [w?.content]);

  useEffect(() => {
    document.title = w?.title ? `${w.title} | Writeups` : "Writeups";
  }, [w?.title]);

  if (!w) {
    return (
      <section className="min-h-screen bg-[#0A0F1F] pt-28 px-6 text-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-gray-800/60 bg-black/20 p-6">
            Writeup not found.
          </div>
        </div>
      </section>
    );
  }

  const summary = w.summary || w.description || "";

  return (
    <section className="min-h-screen bg-[#0A0F1F] pt-24 px-6 text-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Top nav */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/writeups"
            className="text-sm text-gray-300 hover:text-[#0FF5C8] transition"
          >
            ← Back to Writeups
          </Link>

          <div className="hidden sm:flex gap-2">
            {w.category && <Chip>{w.category}</Chip>}
            {w.difficulty && <Chip>Difficulty: {w.difficulty}</Chip>}
            {w.points != null && <Chip>Points: {w.points}</Chip>}
          </div>
        </div>

        {/* Hero */}
        <header className="rounded-2xl border border-gray-800/60 bg-black/20 p-6 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0FF5C8] leading-tight">
            {w.title}
          </h1>

          {summary && (
            <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed">
              {summary}
            </p>
          )}

          {/* Mobile chips */}
          <div className="mt-5 flex flex-wrap gap-2 sm:hidden">
            {w.category && <Chip>{w.category}</Chip>}
            {w.difficulty && <Chip>Difficulty: {w.difficulty}</Chip>}
            {w.points != null && <Chip>Points: {w.points}</Chip>}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-800/60 bg-black/10 p-4">
              <div className="text-xs uppercase tracking-wider text-gray-400">
                Metadata
              </div>
              <div className="mt-3 space-y-2">
                <MetaRow label="Event" value={w.event} />
                <MetaRow label="Author" value={w.author} />
                <MetaRow label="Writeup by" value={w.writeupBy} />
                <MetaRow label="Date" value={w.date} />
                <MetaRow label="Updated" value={w.updated} />
              </div>
            </div>

            <div className="md:col-span-2 rounded-xl border border-gray-800/60 bg-black/10 p-4">
              <div className="text-xs uppercase tracking-wider text-gray-400">
                Tags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(w.tags || []).length ? (
                  w.tags.map((t) => <Chip key={t}>{t}</Chip>)
                ) : (
                  <div className="text-sm text-gray-400">No tags</div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Content */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl border border-gray-800/60 bg-black/20 p-6 md:p-8">
              <div
                className="
                  prose prose-invert max-w-none
                  prose-headings:scroll-mt-28
                  prose-a:text-[#0FF5C8]
                  prose-code:text-[#0FF5C8]
                  prose-strong:text-gray-100
                  prose-pre:bg-black/40
                  prose-pre:border prose-pre:border-gray-700/50
                  prose-pre:rounded-xl
                  prose-pre:overflow-x-auto
                  prose-blockquote:border-l-[#0FF5C8]
                  prose-blockquote:text-gray-300
                  prose-hr:border-gray-700/40
                  prose-li:marker:text-gray-500
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, ...props }) => {
                      const text = getNodeText(props.children);
                      const id = slugify(text);
                      return <h2 id={id} {...props} />;
                    },
                    h3: ({ node, ...props }) => {
                      const text = getNodeText(props.children);
                      const id = slugify(text);
                      return <h3 id={id} {...props} />;
                    },
                  }}
                >
                  {w.content}
                </ReactMarkdown>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl border border-gray-800/60 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-200">
                    Table of contents
                  </div>
                  <div className="text-xs text-gray-400">
                    {toc?.length ? `${toc.length} items` : "—"}
                  </div>
                </div>

                <div className="mt-4">
                  {toc?.length ? (
                    <ul className="space-y-2">
                      {toc.map((h) => (
                        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                          <a
                            href={`#${h.id}`}
                            className="text-sm text-gray-300 hover:text-[#0FF5C8] transition"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-400">
                      Add <code>##</code> / <code>###</code> headings in your
                      markdown to generate a TOC.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800/60 bg-black/20 p-5">
                <div className="text-sm font-semibold text-gray-200">
                  Writing checklist
                </div>
                <ul className="mt-3 text-sm text-gray-300 space-y-2">
                  <li>• Overview: target, goal, impact, fix</li>
                  <li>• Clear PoC requests + evidence</li>
                  <li>• Mitigation steps and references</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </section>
  );
}
