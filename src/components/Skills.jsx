export default function Skills() {
  return (
    <section id="skills" className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-400">
        Technical Skills
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Skill cards */}
        <SkillCard
          title="Web Application Penetration Testing"
          lines={[
            "OWASP Top 10: SQLi, SSRF, XSS, SSTI, CSRF, XXE, BAC, IDOR.",
            "Tools: Burp Suite, Metasploit, Nikto.",
          ]}
        />

        <SkillCard
          title="Mobile & API Security"
          lines={[
            "Android static & dynamic analysis (jadx, Frida, Burp).",
            "API testing: auth bypass, broken object level auth.",
          ]}
        />

        <SkillCard
          title="Network & SOC"
          lines={[
            "Port scanning, enumeration, OS fingerprinting.",
            "SIEM experience with Splunk.",
          ]}
        />

        <SkillCard
          title="Platforms"
          lines={[
            "Operating Systems: Linux, Windows.",
            "Networking fundamentals & configs.",
          ]}
        />
      </div>
    </section>
  );
}

function SkillCard({ title, lines }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
      <h3 className="font-semibold text-slate-100">{title}</h3>
      {lines.map((l, i) => (
        <p key={i} className="text-sm text-slate-200">
          {l}
        </p>
      ))}
    </div>
  );
}
