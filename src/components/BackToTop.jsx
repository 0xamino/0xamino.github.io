import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 bg-neon text-black px-4 py-2 rounded-lg shadow-neon animate-glowPulse hover:scale-110 transition"
    >
      <img src="/Images/icons/back.svg" alt="Back to top" className="h-7 w-5" />
    </button>
  ) : null;
}
