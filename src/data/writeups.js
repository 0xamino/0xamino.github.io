// src/data/writeups.js

// Load all markdown writeups under src/content/writeups
const mdModules = import.meta.glob("../content/writeups/**/*.md", {
  // REMOVE THIS: as: "raw", 
  
  // ADD THESE TWO LINES:
  query: "?raw",
  import: "default",
  
  eager: true,
});

// Minimal front-matter parser (browser-safe)
// Supports:
// ---
// title: Something
// date: 2025-12-01
// tags: [CTF, DNS]
// ---
// markdown body...
function parseFrontMatter(raw) {
  const fm = { data: {}, content: raw };

  if (!raw.startsWith("---")) return fm;

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return fm;

  const header = raw.slice(3, end).trim();
  const content = raw.slice(end + "\n---".length).trim();

  const lines = header.split("\n").map((l) => l.trim()).filter(Boolean);

  const data = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // remove quotes
    value = value.replace(/^["']|["']$/g, "");

    // parse [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      data[key] = inner
        ? inner.split(",").map((x) => x.trim().replace(/^["']|["']$/g, ""))
        : [];
      continue;
    }

    // parse numbers
    if (!Number.isNaN(Number(value)) && value !== "") {
      // keep dates like 2025-12-01 as string (don’t turn into number)
      if (!/^\d{4}-\d{2}-\d{2}/.test(value)) data[key] = Number(value);
      else data[key] = value;
      continue;
    }

    data[key] = value;
  }

  return { data, content };
}

export const writeups = Object.entries(mdModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontMatter(raw);

    const slug = path
      .replace("../content/writeups/", "")
      .replace(".md", "");

    return {
      slug,
      content,
      // defaults (avoid undefined crashes)
      title: data.title || slug.split("/").pop(),
      description: data.description || "",
      tags: data.tags || [],
      image: data.image || "Images/icons/0xamino.png",
      ...data,
    };
  })
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
