import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation();
  
  const categories = [
    {
      title: "Offensive Security",
      items: ["Mobile Pentest","Network Pentest","OWASP Top 10","Web Pentest","CTF","Bug Bounty"],
    },
    {
      title: "Tools",
      items: ["Burpsuite","Nmap", "FFUF", "dig", "Linux", "Docker"],
    },
    {
      title: "Programming",
      items: ["Python", "JavaScript", "Bash"],
    }
  ];

  return (
    <section id="skills" ref={ref} className={`py-24 bg-[#0D1117] text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-[#0FF5C8]">Skills</h2>

        <div className="grid md:grid-cols-3 gap-12">
          {categories.map((cat, index) => (
            <div key={index} className="bg-[#141A29] p-6 rounded-lg shadow-lg border border-[#0FF5C8]/20">
              <h3 className="text-2xl font-semibold mb-4 text-[#0FF5C8]">{cat.title}</h3>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => (
                  <span key={i} className="bg-[#0FF5C8]/10 text-[#0FF5C8] px-3 py-1 rounded-md text-sm border border-[#0FF5C8]/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
