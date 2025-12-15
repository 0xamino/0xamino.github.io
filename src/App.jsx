// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";


import Home from "./components/Home";
import Archive from "./components/Archive";
import WriteupDetail from "./components/WriteupDetail";
import ProjectDetail from "./components/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="bg-cyberblack text-white min-h-screen flex flex-col">
      <Navbar />

      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          {/* Home + sections */}
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/experience" element={<Home />} />
          <Route path="/certs" element={<Home />} />
          <Route path="/writeups" element={<Home />} />
          <Route path="/contact" element={<Home />} />

          {/* Other pages */}
          <Route path="/archive" element={<Archive />} />
          <Route path="/writeups/:slug" element={<WriteupDetail />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
