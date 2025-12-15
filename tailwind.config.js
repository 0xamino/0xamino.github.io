/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        cyberdark: "#0A0F1F",
        cyberblack: "#0D1117",
        cybersurface: "#141A29",
        neon: "#0FF5C8",
        neonblue: "#3A86FF",
        neonviolet: "#8B5CF6",
      },

      boxShadow: {
        neon: "0 0 15px rgba(0, 255, 200, 0.5)",
      },

      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
        glowPulse: "glowPulse 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 200, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 255, 200, 0.7)" },
          "100%": { boxShadow: "0 0 5px rgba(0, 255, 200, 0.3)" },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography'),],
};
