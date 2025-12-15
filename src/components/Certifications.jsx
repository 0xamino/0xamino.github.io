import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Certifications() {
  const [ref, isVisible] = useScrollAnimation();

  const certs = [
    {
      name: "eWPTXv2 — Web Application Penetration Tester Extreme",
      issuer: "INE / eLearnSecurity",
      date: "In Progress (2025)",
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
    <section id="certs" ref={ref} className={`py-24 bg-[#0D1117] text-white transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 text-neon">
          Certifications
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {certs.map((cert, index) => (
            <div
              key={index}
              className="bg-cybersurface p-6 rounded-lg border border-neon/20 hover:shadow-neon transition-shadow"
            >

              {/* Logo */}
              <div className="h-20 flex justify-center items-center mb-4">
                <img
                  src={cert.logo}
                  alt="Certification Logo"
                  // className="w-full h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  className=" w-full h-28 object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/20"
                />
              </div>

              {/* Text */}
              <h3 className="text-x1 font-semibold text-neon mb-2">
                {cert.name}
              </h3>

              <p className="text-gray-300 text-sm mb-1">{cert.issuer}</p>
              <p className="text-gray-400 text-xs">{cert.date}</p>
              
              {/* Button */}
              <div className="pt-3">
                <a
                  href={cert.link}
                  target="_blank"
                  className="block text-center w-full px-4 py-2 border border-neon text-neon rounded-md hover:bg-neon/10 transition"
                >
                  View →
                </a>
              </div>

            </div>

            
          ))}

        </div>

      </div>
    </section>
  );
}
