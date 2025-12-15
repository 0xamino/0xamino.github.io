import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Experience() {
  const [ref, isVisible] = useScrollAnimation();

  const experiences = [
    {
      role: "Quality Assurance Engineer (Manual Software Testing)",
      company: "CyberX",
      period: "February 2025 – Present",
      description: [
        "Performed comprehensive manual and API testing.",
        "Designed, executed, and documented test cases.",
        "Reported and tracked 1500+ issues in Jira.",
        "Conducted retesting after updates and hotfixes.",
        "Reviewed penetration testing reports & performed remediation tests.",
        "Maintained test documentation supporting audits and compliance."
      ],
    },
    {
      role: "Cybersecurity Consultant Intern",
      company: "Liquid C2 MENA",
      period: "July 2024 – September 2024",
      description: [
        "GRC: Built asset & risk registers; performed architecture reviews.",
        "Pentesting: Tested mobile apps, networks, and AI systems for weaknesses.",
        "SOC: Conducted log analysis, threat hunting, and triage.",
        "Authored full incident report covering attack chain & response."
      ],
    },
  ];

  return (
    <section id="experience" ref={ref} className={`py-24 bg-[#0D1117] text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 text-neon">
          Experience
        </h2>

        <div className="relative border-l-2 border-neon/50 ml-6">

          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 ml-6 relative">

              {/* Neon Dot */}
              <div className="w-4 h-4 bg-neon rounded-full absolute -left-[2.1rem] top-1 shadow-neon"></div>

              <div className="bg-cybersurface p-6 rounded-lg border border-neon/20 animate-slideUp">
                <h3 className="text-2xl font-semibold text-neon mb-1">
                  {exp.role}
                </h3>

                <p className="text-neonblue font-medium mb-3">
                  {exp.company} — <span className="text-gray-400">{exp.period}</span>
                </p>

                <ul className="text-gray-300 space-y-2">
                  {exp.description.map((line, i) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
