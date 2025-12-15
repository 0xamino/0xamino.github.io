import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { writeups } from "../data/writeups";

export default function WriteupDetails() {
  const { slug } = useParams();
  const decoded = decodeURIComponent(slug);

  const w = writeups.find((x) => x.slug === decoded);

  if (!w) {
    return (
      <section className="min-h-screen bg-[#0A0F1F] pt-28 px-6 text-gray-200">
        <div className="max-w-4xl mx-auto">Writeup not found.</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0A0F1F] pt-28 px-6 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-1xl md:text-5xl font-bold text-[#0FF5C8]">
          {w.title}
        </h1>

        <div className="mt-4 text-gray-300 space-y-1">
          {w.event && <div>Event: {w.event}</div>}
          {w.category && <div>Category: {w.category}</div>}
          {w.points != null && <div>Points: {w.points}</div>}
          {w.author && <div>Author: {w.author}</div>}
          {w.writeupBy && <div>Writeup by: {w.writeupBy}</div>}
          {w.date && <div>Date: {w.date}</div>}
        </div>

        <div className="mt-10 prose prose-invert max-w-none prose-a:text-[#0FF5C8] prose-code:text-[#0FF5C8]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {w.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
