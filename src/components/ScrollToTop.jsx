// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionMap = {
      "/skills": "skills",
      "/projects": "projects",
      "/experience": "experience",
      "/certs": "certs",
      "/writeups": "writeups",
      "/contact": "contact",
    };

    const sectionId = sectionMap[pathname];

    if (sectionId) {
      // small timeout to ensure Home is rendered
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      }, 0);
    } else {
      // no section → just go to top
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
