export default function Projects() {
  return (
    <section id="projects" className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-400">Projects</h2>

      <article className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
        <h3 className="font-semibold text-slate-100">
          Graduation Project — LLM Orchestrated Pentesting Framework
        </h3>
        <p className="text-sm text-slate-200">
          End-to-end automated pentesting system using modular LLM-driven
          agents. Supports enumeration, fuzzing, and automated exploitation.
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        <ProjectCard
          title="Risk Management"
          text="Performed asset inventory, vulnerability assessment, and risk assessment during Liquid C2 internship."
        />
        <ProjectCard
          title="Boss of the SOC v1"
          text="Completed Splunk BOTS challenges & prepared full incident report."
        />
      </div>
    </section>
  );
}

function ProjectCard({ title, text }) {
  return (
    <article className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-1">
      <h3 className="font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-200">{text}</p>
    </article>
  );
}
