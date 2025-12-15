import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // correct for 0xamino.github.io root repo
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // silence large chunk warning (kB)
  },
});
