import { Link } from "react-router-dom";

export default function Hero() {
  const handleDownloadCV = () => {
    const fileId = "1AEAUKnyuqqcWgxTOwtdAH1zUxhpQXe6L";

    window.open(`https://drive.google.com/file/d/${fileId}/view`, "_blank");
    setTimeout(() => {
      window.location.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }, 1000);
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 bg-[#0A0F1F] pt-24 gap-12">

      {/* LEFT — Profile GIF + Social Links */}
      <div className="flex flex-col items-center space-y-4 md:mr-12">

        {/* Profile GIF */}
        <div className="w-64 h-64 rounded-xl overflow-hidden border-2 border-[#0FF5C8] shadow-lg shadow-[#0FF5C8]/40">
          <img
            src="Images/icons/0xamino.gif"
            alt="Alamin GIF"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">

          {/* Linkedin */}
          <a
            href="https://www.linkedin.com/in/alaminalaa8"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/linkedin.svg"
              className="w-6 h-6"
              alt="Linkedin"
            />
          </a>

          {/* Hack The Box */}
          <a
            href="https://app.hackthebox.com/profile/1968865"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/htb.svg"
              className="w-6 h-6"
              alt="Hack The Box"
            />
          </a>

          {/* Bugcrowd */}
          <a
            href="https://bugcrowd.com/0xamino"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/bugcrowd.svg"
              className="w-6 h-6"
              alt="Bugcrowd"
            />
          </a>

          {/* HackerOne */}
          <a
            href="https://hackerone.com/0xamino"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/h1.svg"
              className="w-6 h-6"
              alt="HackerOne"
            />
          </a>

          {/* Medium
          <a
            href="https://medium.com/@0xamino"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/medium.png"
              className="w-6 h-6"
              alt="Medium"
            />
          </a> */}

          {/* GitHub */}
          <a
            href="https://github.com/0xamino"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition transform hover:scale-110"
          >
            <img
              src="Images/icons/github.png"
              className="w-6 h-6 invert"
              alt="GitHub"
            />
          </a>

        </div>
      </div>

      {/* RIGHT — Text */}
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="text-[#0FF5C8]">Alamin Alaa</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Web Application Penetration Tester & Security Researcher
        </p>

        <p className="text-gray-400 mb-8">
          I break web applications to help make them more secure — specializing in
          vulnerability analysis, exploitation, automation, and CTF problem solving.
        </p>

        <div className="flex space-x-10 justify-center md:justify-start">
          <button
            onClick={handleDownloadCV}
            className="px-6 py-3 border border-[#0FF5C8] text-[#0FF5C8] font-semibold rounded-lg hover:bg-[#0FF5C8]/10 transition"
          >
            Download CV
          </button>

          <a
            href="#projects"
            className="px-6 py-3 border border-[#0FF5C8] text-[#0FF5C8] font-semibold rounded-lg hover:bg-[#0FF5C8]/10 transition"
          >
            Latest Projects
          </a>

          <Link to={`/archive`} className="px-6 py-3 border border-[#0FF5C8] text-[#0FF5C8] font-semibold rounded-lg hover:bg-[#0FF5C8]/10 transition" >Archive</Link>
        </div>

         
      </div>

    </section>
  );
}
