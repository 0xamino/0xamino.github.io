import Header from "./components/Header";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Links from "./components/Links";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <Summary />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Education />
        <Links />
      </main>
      <Footer />
    </div>
  );
}

