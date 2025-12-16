import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Certifications() {
  const [ref, isVisible] = useScrollAnimation();

  const certs = [
    {
      name: "eWPTXv2 — Web Application Penetration Tester Extreme",
      issuer: "INE / eLearnSecurity",
      date: "Augest 2024",
      logo: "Images/Certificates/ewptx.png", // replace with your real logo
      link: "https://certs.ine.com/15c169f4-8cce-4813-b690-42baaf8d5932"
    },
    // {
    //   name: "SOC Analyst Training",
    //   issuer: "ITI National Telecommunication Institute",
    //   date: "2022",
    //   logo: "/iti.png",
    // },
    // {
    //   name: "Cybersecurity Fundamentals",
    //   issuer: "Coursera / Google",
    //   date: "2021",
    //   logo: "/googlecyber.png",
    // }
  ];

  return (
<section
      id="certs"
      ref={ref}
      className={`py-24 bg-[#0D1117] text-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-neon">
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certs.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              // MATCHED: flex, flex-col, h-full, same borders and hover effects
              className="group bg-cybersurface rounded-lg border border-neon/20 overflow-hidden hover:shadow-neon transition-shadow flex flex-col h-full"
            >
              {/* Image - MATCHED: h-40 container. Used object-contain for logos so they don't get cropped. */}
              <div className="h-40 bg-black overflow-hidden shrink-0 p-4 flex items-center justify-center">
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className=" w-full h-28  object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/20"
                />
              </div>

              {/* Content - MATCHED: flex-1 flex flex-col to push footer down */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                
                {/* Date */}
                <p className="text-xs text-gray-400">
                  {cert.date}
                </p>

                {/* Title - MATCHED: text-xl font-semibold text-neonblue */}
                <h3 className="text-xl font-semibold text-neonblue">
                  {cert.name}
                </h3>

                {/* Issuer - MATCHED: flex-1 to fill space */}
                <p className="text-gray-300 text-sm flex-1">
                  Issued by {cert.issuer}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
