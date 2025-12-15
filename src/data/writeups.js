// src/data/writeups.js

// Load all markdown writeups under src/content/writeups
const mdModules = import.meta.glob("../content/writeups/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal front-matter parser (browser-safe)
//
// Supports:
// ---
// title: Something
// date: 2025-12-01
// tags: [CTF, DNS]
// ---
// markdown body...
function parseFrontMatter(raw) {
  const fm = { data: {}, content: raw };

  if (typeof raw !== "string" || !raw.startsWith("---")) return fm;

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return fm;

  const header = raw.slice(3, end).trim();
  const content = raw.slice(end + "\n---".length).trim();

  const lines = header
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const data = {};

  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // remove surrounding quotes
    value = value.replace(/^["']|["']$/g, "");

    // parse [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      data[key] = inner
        ? inner
            .split(",")
            .map((x) => x.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean)
        : [];
      continue;
    }

    // parse booleans
    if (value === "true" || value === "false") {
      data[key] = value === "true";
      continue;
    }

    // parse numbers (but keep ISO dates as strings)
    if (value !== "" && !Number.isNaN(Number(value))) {
      if (!/^\d{4}-\d{2}-\d{2}/.test(value)) data[key] = Number(value);
      else data[key] = value;
      continue;
    }

    data[key] = value;
  }

  return { data, content };
}

function safeSlug(path) {
  return path
    .replace("../content/writeups/", "")
    .replace(/\.md$/, "")
    .trim()
    .toLowerCase();
}

function normalizeDate(v) {
  if (!v) return "";
  const s = String(v).trim();
  // keep simple sortable strings; your UI can format later
  return s;
}

export const writeups = Object.entries(mdModules)
  .map(([path, raw]) => {
    try {
      const { data, content } = parseFrontMatter(raw);
      const slug = safeSlug(path);

      return {
        slug,
        content,

        // Core fields with safe defaults
        title: data.title || slug.split("/").pop() || "Untitled",
        description: data.description || "",
        summary: data.summary || data.description || "",

        // Taxonomy
        tags: Array.isArray(data.tags) ? data.tags : [],
        category: data.category || "",
        difficulty: data.difficulty || "",
        status: data.status || "Published",

        // Optional metadata
        event: data.event || "",
        author: data.author || "",
        writeupBy: data.writeupBy || "",

        // Dates
        date: normalizeDate(data.date),
        updated: normalizeDate(data.updated),

        // Media
        image: data.cover || "Images/icons/default.png",

        // Keep any extra fields from front-matter available
        ...data,
      };
    } catch {
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => {
    const ad = a.updated || a.date || "";
    const bd = b.updated || b.date || "";
    return bd.localeCompare(ad);
  });
