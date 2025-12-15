export default function Footer() {
  return (
    <footer id="contact" className="bg-cyberblack text-gray-300 py-12 border-t border-neon/20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Neon Line */}
        <div className="w-full h-[1px] bg-neon/30 mb-8"></div>

        <h3 className="text-2xl font-semibold text-neon mb-4">
          Let's Connect
        </h3>

        <p className="text-gray-400 mb-6">
          Feel free to reach out for work, collaborations, or cybersecurity discussions.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-8">

        {/* GitHub */}
          <a
            href="https://github.com/0xamino"
            target="_blank"
            className="text-neon hover:text-white hover:scale-110 transition"
          >
            GitHub
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/alaminalaa8"
            target="_blank"
            className="text-neon hover:text-white hover:scale-110 transition"
          >
            LinkedIn
          </a>

          {/* Whatsapp */}
          <a
            href="https://wa.me/+201554209906"
            className="text-neon hover:text-white hover:scale-110 transition"
          >
            Whatsapp
          </a>


          {/* Email */}
          <a
            href="mailto:alamenalaa8@gmail.com"
            className="text-neon hover:text-white hover:scale-110 transition"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Alamin Alaa — All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
