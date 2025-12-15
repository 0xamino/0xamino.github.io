import { useMemo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Pick ONE theme you like (these don't change your site colors much; code block only)
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

// Only include ## headings in TOC (clean, professional)
function extractHeadings(markdown) {
  const lines = String(markdown || "").split("\n");
  const headings = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length; // 2 or 3
    const text = match[2].replace(/\s+#\s*$/, "").trim();
    if (!text) continue;

    headings.push({
      level,
      text,
      id: slugify(text),
    });
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

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function detectCallout(text) {
  // Expected patterns inside blockquote: "Rule: ..." "Note: ..." etc.
  const m = /^(Rule|Note|Warning|Tip)\s*:\s*/i.exec(text || "");
  if (!m) return null;
  return m[1].toLowerCase();
}

function Callout({ type, children }) {
  const title =
    type === "rule"
      ? "Rule"
      : type === "note"
      ? "Note"
      : type === "warning"
      ? "Warning"
      : "Tip";

  return (
    <div className="my-5 rounded-xl border border-gray-700/60 bg-black/20 p-4">
      <div className="text-sm font-semibold text-[#0FF5C8]">{title}</div>
      <div className="mt-2 text-sm text-gray-200 leading-relaxed">{children}</div>
    </div>
  );
}

function CodeBlock({ inline, className, children }) {
  const code = String(children ?? "").replace(/\n$/, "");
  const match = /language-(\w+)/.exec(className || "");
  const lang = match?.[1] || "text";

  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // ignore
    }
  }

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  return (
    <div className="my-5 rounded-xl border border-gray-700/50 bg-black/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700/40">
        <span className="text-xs text-gray-400">{lang}</span>
        <button
          type="button"
          onClick={copy}
          className="text-xs px-2 py-1 rounded-md border border-gray-700/60 bg-black/20 text-gray-200 hover:text-[#0FF5C8] transition"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "14px",
          fontSize: "0.9rem",
        }}
        codeTagProps={{ style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
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
  window.location.replace("/404.html");
  return null;
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
                  w.tags.map((t) => <Chip key={t} >{t}</Chip>)
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
                  prose-hr:border-gray-700/40
                  prose-li:marker:text-gray-500
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // headings get IDs for TOC scrolling
                    h2: ({ ...props }) => {
                      const text = getNodeText(props.children);
                      const id = slugify(text);
                      return <h2 id={id} {...props} />;
                    },
                    h3: ({ children, ...props }) => {
                      const text = getNodeText(children);
                      const id = slugify(text);
                      return <h3 id={id} {...props}>{children}</h3>;
                    },

                    // code highlighting + copy
                    code: CodeBlock,

                    // callout blocks from blockquotes
                    blockquote: ({ children }) => {
                      const raw = getNodeText(children);
                      const type = detectCallout(raw);

                      if (!type) return <blockquote>{children}</blockquote>;

                      // remove the "Rule:" prefix visually (optional)
                      const cleaned = raw.replace(/^(Rule|Note|Warning|Tip)\s*:\s*/i, "");
                      return <Callout type={type}>{cleaned}</Callout>;
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
                        <li key={h.id}>
                          <button
                            type="button"
                            onClick={() => scrollToId(h.id)}
                            className="text-left text-sm text-gray-300 hover:text-[#0FF5C8] transition"
                          >
                            {h.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-400">
                      Add <code>###</code> headings in your markdown to generate a TOC.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800/60 bg-black/20 p-5">
                <div className="text-sm font-semibold text-gray-200">
                  Writing checklist
                </div>
                <ul className="mt-3 text-sm text-gray-300 space-y-2">
                  <li>• Objective + constraints</li>
                  <li>• Commands + results</li>
                  <li>• Final flag / impact / conclusion</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="h-16" />
      </div>
    </section>
  );
}
