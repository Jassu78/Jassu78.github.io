import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** User site: https://jassu78.github.io/ */
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
