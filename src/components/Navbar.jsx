// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#0FF5C8]/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo → home */}
        <h1 className="relative z-[999]">
          <Link
            to="/"
            className="inline-block text-xl font-bold text-[#0FF5C8] tracking-wider"
          >
            0xamino
          </Link>
        </h1>

        {/* Menu */}
        <div className="hidden md:flex space-x-8 text-gray-300">
          <Link to="/skills" className="hover:text-[#0FF5C8] transition">
            Skills
          </Link>
          <Link to="/projects" className="hover:text-[#0FF5C8] transition">
            Projects
          </Link>
          <Link to="/experience" className="hover:text-[#0FF5C8] transition">
            Experience
          </Link>
          <Link to="/certs" className="hover:text-[#0FF5C8] transition">
            Certifications
          </Link>
          <Link to="/writeups" className="hover:text-[#0FF5C8] transition">
            Writeups
          </Link>
          <Link to="/archive" className="hover:text-[#0FF5C8] transition">
            Archive
          </Link>
          <Link to="/contact" className="hover:text-[#0FF5C8] transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
