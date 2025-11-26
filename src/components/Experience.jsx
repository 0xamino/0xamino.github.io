export default function Experience() {
  return (
    <section id="experience" className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-400">
        Professional Experience
      </h2>

      {/* CyberX */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold">
            CyberX — Quality Assurance Engineer (Manual Testing)
          </h3>
          <p className="text-xs text-slate-400">February 2025 – Present</p>
        </div>

        <ul className="text-sm text-slate-200 space-y-1 list-disc list-inside">
          <li>Performed comprehensive manual and API testing.</li>
          <li>Designed, executed, and documented test cases.</li>
          <li>Reported and tracked 900+ issues in Jira.</li>
          <li>Conducted retesting after updates and hotfixes.</li>
          <li>
            Reviewed penetration testing reports & performed remediation tests.
          </li>
          <li>
            Maintained test documentation supporting audits and compliance.
          </li>
        </ul>
      </article>

      {/* Liquid C2 */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold">
            Liquid C2 MENA — Cybersecurity Consultant Intern
          </h3>
          <p className="text-xs text-slate-400">July 2024 – September 2024</p>
        </div>

        <ul className="text-sm text-slate-200 space-y-1 list-disc list-inside">
          <li>
            GRC: Built asset & risk registers; performed architecture reviews.
          </li>
          <li>
            Pentesting: Tested mobile apps, networks, and AI systems for
            weaknesses.
          </li>
          <li>SOC: Conducted log analysis, threat hunting, and triage.</li>
          <li>
            Authored full incident report covering attack chain & response.
          </li>
        </ul>
      </article>
    </section>
  );
}